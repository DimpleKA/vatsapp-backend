// Otp.js

const mongoose = require('mongoose');

// Define OTP Schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otpSent: {
    type: String,
   
  },
  otpFromUser: {
    type: String,
  
  },
}, { timestamps: true });

// Create OTP model
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
