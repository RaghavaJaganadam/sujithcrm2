import mongoose from "mongoose";
import User from "./models/User.js";

const users = [
  {
    email: "admin@company.com",
    password: "password123",
    role: "admin",
    name: "Admin User",
  },
  {
    email: "alice@company.com",
    password: "password123",
    role: "sales",
    name: "Alice",
  },
  {
    email: "bob@company.com",
    password: "password123",
    role: "sales",
    name: "Bob",
  },
  {
    email: "harsha@company.com",
    password: "password123",
    role: "marketing",
    name: "Harsha",
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("User database seeded!");
  mongoose.disconnect();
}

seed();
