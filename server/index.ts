import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Dashboard from "../backend/models/Dashboard.js";
import leadsRouter from "../backend/routes/leads.js";
import authRouter from "./routes/auth.js";
import { handleDemo } from "../crm-project/backend/routes/demo";
import { handleLogin } from "../crm-project/backend/routes/login.js";

export function createServer() {
  const app = express();

    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crm")
      .then(() => {
        console.log("MongoDB connected");
      }).catch((err) => {
        console.error("MongoDB connection error:", err);
      });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/leads", leadsRouter);
  app.use("/api/auth", authRouter);

  // Login API route
  app.post("/api/login", handleLogin);

    // Dashboard API route (fetch by user email)
    app.get("/api/dashboard", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      try {
        const dashboard = await Dashboard.findOne({ userEmail: email });
        if (!dashboard) {
          return res.status(404).json({ error: "Dashboard not found" });
        }
        res.json(dashboard);
      } catch (err) {
        res.status(500).json({ error: "Server error" });
      }
    });

  return app;
}
