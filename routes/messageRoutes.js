// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route for sending a message
router.post('/send', async (req, res) => {
  try {
    const { fromEmail, toEmail, message } = req.body;

    // Check if all required fields are present
    if (!fromEmail || !toEmail || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new message
    const newMessage = new Message({ fromEmail, toEmail, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for fetching messages between two users
router.get('/conversation/:fromEmail/:toEmail', async (req, res) => {
  try {
    const { fromEmail, toEmail } = req.params;

    // Fetch messages between the specified users
    const messages = await Message.find({
      $or: [
        { fromEmail: fromEmail, toEmail: toEmail },
        { fromEmail: toEmail, toEmail: fromEmail }
      ]
    }).sort({ datetime: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
