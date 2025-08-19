import mongoose from "mongoose";
import Dashboard from "./models/Dashboard.js";

const dashboards = [
  {
    userEmail: "alice@company.com",
    stats: {
      totalLeads: 12,
      monthlyTarget: 80,
      activeSalesMembers: 1,
      totalRevenue: 8500,
      conversions: 3,
      newLeads: 4,
    },
    leadDistribution: {
      qualified: 5,
      proposal: 3,
      won: 3,
      total: 11,
    },
    recentLeads: [
      { company: "Acme Corp", contact: "Jane Doe", status: "qualified", value: 2000, lastActivity: "1 hour ago" },
      { company: "Beta LLC", contact: "Sam Smith", status: "proposal", value: 3000, lastActivity: "3 hours ago" },
      { company: "Gamma Inc", contact: "Alex Lee", status: "won", value: 3500, lastActivity: "Yesterday" },
    ],
    teamMembers: [
      { name: "Alice", role: "Sales Member", performance: 80, deals: 3, revenue: 8500 },
    ],
  },
  {
    userEmail: "bob@company.com",
    stats: {
      totalLeads: 9,
      monthlyTarget: 60,
      activeSalesMembers: 1,
      totalRevenue: 5200,
      conversions: 2,
      newLeads: 2,
    },
    leadDistribution: {
      qualified: 3,
      proposal: 2,
      won: 2,
      total: 7,
    },
    recentLeads: [
      { company: "Delta Co", contact: "Chris Green", status: "qualified", value: 1200, lastActivity: "2 hours ago" },
      { company: "Echo Ltd", contact: "Pat Brown", status: "proposal", value: 2000, lastActivity: "Today" },
      { company: "Foxtrot Inc", contact: "Morgan Lee", status: "won", value: 2000, lastActivity: "Yesterday" },
    ],
    teamMembers: [
      { name: "Bob", role: "Sales Member", performance: 60, deals: 2, revenue: 5200 },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Dashboard.deleteMany({});
  await Dashboard.insertMany(dashboards);
  console.log("Database seeded!");
  mongoose.disconnect();
}

seed();
