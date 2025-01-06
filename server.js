// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const ipInfoRoutes = require('./routes/ipInfo');
const maxmind = require('maxmind');
const morgan = require('morgan'); // For logging
const helmet = require('helmet'); // For security
const cors = require('cors'); // For CORS

// Create an Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Load MaxMind database
const db = maxmind.openSync('path/to/your/maxmind/db.mmdb');

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(morgan('dev')); // Log requests
app.use(helmet()); // Secure the app
app.use(cors()); // Enable CORS

// Routes
app.use('/api', ipInfoRoutes);

// Custom route to test the server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Custom route to test the MaxMind database
app.get('/ip', (req, res) => {
  const ip = req.ip;
  const geo = db.get(ip);
  res.json(geo);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('MaxMind database loaded successfully.');
});


