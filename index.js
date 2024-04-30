// app.js

const express = require('express');
const dbConnect = require('./db');
const cors = require('cors');
const usersRoute = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes')
const registrationRoutesv = require('./routes/registrationRoutes')
const loginRoutes = require('./routes/loginRoutes')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to the database
dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', usersRoute);
app.use('/api/messages', messageRoutes);
app.use('/api/register', registrationRoutesv);
app.use('/api/login', loginRoutes);
// Serve static files (e.g., images)
app.use('/', express.static(path.join(__dirname, '/images')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
