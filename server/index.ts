import dotenv from "dotenv";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import path from "path";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, ".env")
});



import { google } from "googleapis";
const app = express();
app.use(cors({
  origin: ["https://www.worldwidefc.ca", "https://worldwidefc.ca"],
  methods: ["POST", "GET", "OPTIONS"]
}));
const httpServer = createServer(app);
app.options("*", cors()); 
app.use(express.json());

//console.log("ENV:", process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets"
  ]
});

const drive = google.drive({ version: "v3", auth });
const sheets = google.sheets({ version: "v4", auth });


async function uploadToDrive(file: Express.Multer.File) {
  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [process.env.DRIVE_FOLDER_ID!]
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path)
    }
  });

  return `https://drive.google.com/file/d/${res.data.id}/view`;
}

async function appendToSheet(data: {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  position: string;
  experience: string;
  mediaLinks: string[];
}) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID!,
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
        new Date().toISOString()
      ]]
    }
  });
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);



// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos allowed"));
    }
  }
});

app.post("/submit", upload.array("media", 5), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];

    const {
      fullName,
      email,
      phone,
      dob,
      position,
      experience
    } = req.body;

    const mediaLinks = await Promise.all(
      files.map(file => uploadToDrive(file))
    );

    await appendToSheet({
      fullName,
      email,
      phone,
      dob,
      position,
      experience,
      mediaLinks
    });

    const mediaUrls = files.map(file => ({
      name: file.originalname,
      url: `http://localhost:5173/uploads/${file.filename}`,
      type: file.mimetype
    }));

    res.json({
      success: true,
      media: mediaUrls
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }

});


app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register API routes FIRST before Vite middleware
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // Setup Vite AFTER registering API routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5001", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
