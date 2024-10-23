const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const User = require('../models/User');

// Public route: Get all users (for demo purposes)
router.get('/', async (req, res) => {
  const users = await User.find().select('-password'); // Don't send the password
  res.json(users);
});

// Protected route: Get user profile (requires JWT)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

module.exports = router;
