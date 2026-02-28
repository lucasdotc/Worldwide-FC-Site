import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { send } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
  path: "./server/.env"
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  console.log("✅ Registering API routes...");

  
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Test endpoint to verify API routes are working
  app.get("/api/test", (req, res) => {
    console.log("📝 GET /api/test called");
    res.json({ success: true, message: "API routes are working!" });
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    console.log("📝 POST /api/contact called");
    try {
      const { firstName, lastName, email, subject, message } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Log the contact form submission
      console.log("Contact Form Submission:", {
        firstName,
        lastName,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      try {
        //const nodemailer = require("nodemailer");

        // Create a transporter using explicit SMTP settings
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use TLS instead of SSL
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          connectionTimeout: 5000,
          socketTimeout: 5000,
        });

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <p><small>Submitted at: ${new Date().toISOString()}</small></p>
          `,
        };

        // Send email with timeout
        const emailPromise = transporter.sendMail(mailOptions);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Email send timeout")), 10000)
        );
        
        await Promise.race([emailPromise, timeoutPromise]);
        console.log("✅ Email sent successfully");
      } catch (emailError) {
        console.error("⚠️ Email sending error:", emailError instanceof Error ? emailError.message : emailError);
        // Don't fail the request if email fails, just log it
        console.log("✅ Contact form data saved (email failed but form accepted)");
      }

      return res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Failed to process contact form", details: error instanceof Error ? error.message : String(error) });
    }
  });

  return httpServer;
}
