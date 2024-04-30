// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route for fetching a user by email
router.get('/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
      console.log(userEmail);
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports = router;
