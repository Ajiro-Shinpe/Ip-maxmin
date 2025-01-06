const express = require('express');
const router = express.Router();

// Route to test the server
router.get('/', (req, res) => {
  res.send('Server is running!');
});

module.exports = router;


