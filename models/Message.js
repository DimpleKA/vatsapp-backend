// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  fromEmail: { type: String, required: true },
  toEmail: { type: String, required: true },
  message: { type: String, required: true },
  datetime: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
