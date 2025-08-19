import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  stats: {
    totalLeads: Number,
    monthlyTarget: Number,
    activeSalesMembers: Number,
    totalRevenue: Number,
    conversions: Number,
    newLeads: Number,
  },
  leadDistribution: {
    qualified: Number,
    proposal: Number,
    won: Number,
    total: Number,
  },
  recentLeads: [
    {
      company: String,
      contact: String,
      status: String,
      value: Number,
      lastActivity: String,
    },
  ],
  teamMembers: [
    {
      name: String,
      role: String,
      performance: Number,
      deals: Number,
      revenue: Number,
    },
  ],
});

export default mongoose.model("Dashboard", DashboardSchema);
