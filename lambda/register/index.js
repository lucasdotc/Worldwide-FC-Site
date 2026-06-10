const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { google } = require("googleapis");
const busboy = require("busboy");
const { Readable } = require("stream");

const ses = new SESClient({ region: process.env.SES_REGION || "ca-central-1" });

const ALLOWED_ORIGINS = new Set([
  "https://www.worldwidefc.ca",
  "https://worldwidefc.ca",
  "http://localhost:5173",
  "http://localhost:5001",
]);

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "https://www.worldwidefc.ca";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };
}

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];

    const contentType =
      event.headers["content-type"] ||
      event.headers["Content-Type"] ||
      "";

    const bb = busboy({ headers: { "content-type": contentType } });

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("file", (name, stream, info) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        files.push({
          fieldname: name,
          originalname: info.filename,
          mimetype: info.mimeType,
          buffer: Buffer.concat(chunks),
        });
      });
    });

    bb.on("finish", () => resolve({ fields, files }));
    bb.on("error", reject);

    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body || "");

    bb.write(rawBody);
    bb.end();
  });
}

async function uploadToDrive(drive, file) {
  const stream = Readable.from(file.buffer);
  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [process.env.DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: file.mimetype,
      body: stream,
    },
  });
  return `https://drive.google.com/file/d/${res.data.id}/view`;
}

async function appendToSheet(sheets, data) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        data.fullName,
        data.email,
        data.phone,
        data.dob,
        data.position,
        data.experience,
        data.mediaLinks.join(", "),
        new Date().toISOString(),
      ]],
    },
  });
}

async function sendEmail({ to, replyTo, subject, html }) {
  await ses.send(new SendEmailCommand({
    Source: process.env.SES_FROM || "noreply@worldwidefc.ca",
    Destination: { ToAddresses: [to] },
    ...(replyTo && { ReplyToAddresses: [replyTo] }),
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: html } },
    },
  }));
}

exports.handler = async (event) => {
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || "";
  const headers = corsHeaders(origin);

  const method = event.httpMethod || event.requestContext?.http?.method;
  if (method === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    // Parse body — multipart when files attached, JSON otherwise
    let fields, files = [];
    const contentType =
      event.headers["content-type"] ||
      event.headers["Content-Type"] ||
      "";

    if (contentType.includes("multipart/form-data")) {
      const parsed = await parseMultipart(event);
      fields = parsed.fields;
      files = parsed.files;
    } else {
      fields = typeof event.body === "string" ? JSON.parse(event.body) : event.body || {};
    }

    const { fullName, email, phone, dob, position, experience } = fields;

    if (!fullName || !email || !phone || !dob || !position) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Required fields missing" }),
      };
    }

    // Google auth
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const drive = google.drive({ version: "v3", auth });
    const sheets = google.sheets({ version: "v4", auth });

    // Upload media files to Google Drive
    const mediaLinks = await Promise.all(files.map((f) => uploadToDrive(drive, f)));

    // Append row to Google Sheet
    await appendToSheet(sheets, {
      fullName,
      email,
      phone,
      dob,
      position,
      experience: experience || "",
      mediaLinks,
    });

    // Notify the club
    await sendEmail({
      to: process.env.CONTACT_TO || "info@worldwidefc.ca",
      replyTo: email,
      subject: `New Registration Request: ${fullName}`,
      html: `
        <h2>New Player Registration</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Experience:</strong> ${experience || "N/A"}</p>
        ${mediaLinks.length ? `<p><strong>Media:</strong><br>${mediaLinks.map((l) => `<a href="${l}">${l}</a>`).join("<br>")}</p>` : ""}
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
    });

    // Confirmation to the player
    await sendEmail({
      to: email,
      subject: "Registration Received — Worldwide FC",
      html: `
        <h2>Thanks for registering, ${fullName}!</h2>
        <p>We've received your registration request for Worldwide FC. Our coaching staff will review your application and be in touch shortly.</p>
        <p>In the meantime, feel free to reach us on WhatsApp at <strong>+1 (587) 500-4823</strong> with any questions.</p>
        <br>
        <p>— Worldwide FC</p>
      `,
    });

    console.log(`Registration submitted by ${fullName} <${email}>`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Register handler error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
