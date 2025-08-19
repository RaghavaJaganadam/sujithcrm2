import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // If ?all=true, return all leads, else limit to 5 for dashboard
    const query = Lead.find().sort({ lastActivity: -1 });
    if (!req.query.all) {
      query.limit(5);
    }
    const leads = await query;
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Create a new lead
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create lead' });
  }
});

// Update a lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update lead' });
  }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete lead' });
  }
});

export default router;
