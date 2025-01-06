const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Serve static files
app.use('/data', express.static(path.join(__dirname, 'data')));

// Import and use routes
const ipInfoRoutes = require('./routes/IpInfo');
app.use('/api', ipInfoRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
