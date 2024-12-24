const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import routes from crosshairRoutes.js
const { crosshairRouter } = require('./Routes/routes'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using environment variables
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Use the crosshair routes
app.use('/api', crosshairRouter);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
