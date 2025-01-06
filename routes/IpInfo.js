const express = require('express');
const maxmind = require('maxmind');
const router = express.Router();

// Load the MaxMind database
const dbPath = process.env.MAXMIND_DB_PATH || './data/GeoLite2-City.mmdb';
let lookup;

(async () => {
    try {
        lookup = await maxmind.open(dbPath);
        console.log('MaxMind database loaded successfully.');
    } catch (error) {
        console.error('Error loading MaxMind database:', error);
        process.exit(1);
    }
})();

// Route to get IP information
router.get('/ip-info', async (req, res) => {
    const ip = req.query.ip || req.ip;

    if (!lookup) {
        return res.status(500).json({ error: 'MaxMind database not loaded' });
    }

    try {
        const geoData = lookup.get(ip);

        if (!geoData) {
            return res.status(404).json({ error: 'IP information not found' });
        }

        res.json({
            ip: ip,
            city: geoData.city?.names?.en || 'N/A',
            country: geoData.country?.names?.en || 'N/A',
            latitude: geoData.location?.latitude || 'N/A',
            longitude: geoData.location?.longitude || 'N/A',
        });
    } catch (error) {
        console.error('Error fetching IP information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
