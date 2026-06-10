const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

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

exports.handler = async (event) => {
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || "";
  const headers = corsHeaders(origin);

  const method = event.httpMethod || event.requestContext?.http?.method;
  if (method === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const { firstName, lastName, email, subject, message } = body || {};

    if (!firstName || !lastName || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "All fields are required" }),
      };
    }

    await ses.send(new SendEmailCommand({
      Source: process.env.SES_FROM || "noreply@worldwidefc.ca",
      Destination: {
        ToAddresses: [process.env.CONTACT_TO || "info@worldwidefc.ca"],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `Contact Form: ${subject}`,
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <p><small>Submitted at: ${new Date().toISOString()}</small></p>
            `,
          },
        },
      },
    }));

    console.log(`Contact form submitted by ${firstName} ${lastName} <${email}>`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
    };
  } catch (error) {
    console.error("Contact handler error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to process contact form",
        details: error.message,
      }),
    };
  }
};
