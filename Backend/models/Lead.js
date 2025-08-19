const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  companyName: String,
  contactName: String,
  email: String,
  phone: String,
  industry: String,
  source: String,
  value: Number,
  status: String,
  priority: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", LeadSchema);

