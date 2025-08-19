import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  company: String,
  contact: String,
  status: String,
  value: Number,
  lastActivity: String,
});

export default mongoose.model('Lead', LeadSchema);
