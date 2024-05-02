const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Otp = require('../models/Otp');
const sendOTP = require('./dhcat.js');

// Function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 999999).toString();
}

// Route for registering a new user
router.post('/', async (req, res) => {
  try {
    const { email, name, mobile, gender, dpUrl, password } = req.body;

  
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ error: 'Email already exists',message:"login" });
    }

    // Check if the email has an existing OTP
    let otp = '';
    const existingOtp = await Otp.findOne({ email });
  
      // Update existing OTP
      otp = generateOTP();
      const filter = { email: email };
      const update = {  otpSent: otp };
      
      await Otp.findOneAndUpdate(filter, update, { upsert: true });
      

      const message = "The OTP to register your email with us is ";
      sendOTP(email, otp, message);
    

    res.status(201).json({ message: 'OTP sent successfully', displayFullForm:true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for verifying OTP and creating a new user
router.post('/verifyOTP', async (req, res) => {
  try {
    console.log(req.body)
    const { email, otp, name, mobile, gender, dpUrl, password } = req.body;
console.log(email)
console.log(otp)
   

    // Check if the OTP is valid
    const existingOtp = await Otp.findOne({ email, otpSent: otp });
    if (!existingOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Delete the OTP after it's been verified
    await Otp.deleteOne({ email, otp });

    // Create a new user with plain text password
    const newUser = new User({ email, name, mobile, gender, dpUrl, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully',registered:true});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
