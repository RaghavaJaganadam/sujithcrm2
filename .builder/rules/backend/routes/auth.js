const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register sales guy (to be used by admin)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ error: 'Required fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role: role || 'sales' });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login (for both admin and sales)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid Credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid Credentials' });

    const payload = { id: user._id, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: payload });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
