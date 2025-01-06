const express = require('express');
const router = express.Router();
const maxmind = require('maxmind');

// Load MaxMind database
const db = maxmind.openSync('path/to/your/maxmind/db.mmdb');

// Route to get IP info
router.get('/ip/:ip', (req, res) => {
  const ip = req.params.ip;
  const geo = db.get(ip);
  res.json(geo);
});

// Route to get IP info with callback
router.get('/ip/:ip/callback', (req, res) => {
  const ip = req.params.ip;
  const geo = db.get(ip);
  res.jsonp(geo);
});

// Route to get all IP info
router.get('/ips', (req, res) => {
  const ips = db.getAll();
  res.json(ips);
});

module.exports = router;


