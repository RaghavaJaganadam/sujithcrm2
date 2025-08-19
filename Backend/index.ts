import express from "express";
import mongoose from "mongoose";
import { Router } from "express";
declare const leadsRouter: Router;
import Dashboard from "./models/Dashboard.js"; // make sure Dashboard.js exists

declare const Dashboard: any;

const app = express();

app.use(express.json());

// Routes
app.use("/api/leads", leadsRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/crm_project")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
export { leadsRouter };
