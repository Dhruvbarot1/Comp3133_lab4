const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// POST /users - Add a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', error: error.message });
  }
});

module.exports = router;
