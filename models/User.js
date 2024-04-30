// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp:{type:String},
  name: { type: String},
  mobile: { type: String },
  gender: { type: String },
  dpUrl: { type: String },
  password:{type:String},
  lastSeen: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
