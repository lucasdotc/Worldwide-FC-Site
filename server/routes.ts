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

        // Create a transporter using your email service credentials
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Test the connection
        await transporter.verify();

        let mailOptions = {
          from: email,
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

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email fails, just log it
        console.log("Contact form data logged to console even though email failed");
      }

      return res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Failed to process contact form", details: error instanceof Error ? error.message : String(error) });
    }
  });

  return httpServer;
}
