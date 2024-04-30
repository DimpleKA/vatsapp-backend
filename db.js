// db.js

const mongoose = require('mongoose');

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://Dimpleusername:Dimple999@cluster0.l6frpvy.mongodb.net/vatsapp?retryWrites=true&w=majority&appName=Cluster0');

    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    isConnected = false;
  }
};

const dbConnect = async () => {
  if (!isConnected) {
    await connectToDatabase();
  }
};

module.exports = dbConnect;
