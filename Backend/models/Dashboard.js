// backend/models/Dashboard.js
import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  title: String,
  value: Number,
});

export default mongoose.model("Dashboard", DashboardSchema);
