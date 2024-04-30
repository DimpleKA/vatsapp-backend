const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

// POST request to handle login
router.post('/', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return res.status(401).json({ error: 'User is not registered with us! Kindly register.' });
    } else {
      // If user exists, check if the password matches
      if (user.password === password) {
        res.status(200).json({ message: 'Login successful', email, loginSession:true });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
