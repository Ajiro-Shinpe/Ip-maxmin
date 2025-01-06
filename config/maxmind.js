const maxmind = require('maxmind');
const path = require('path');

const dbPath = process.env.MAXMIND_DB_PATH;

// Load the MaxMind database
let lookup;
(async () => {
  try {
    lookup = await maxmind.open(path.resolve(dbPath));
    console.log('MaxMind database loaded successfully.');
  } catch (error) {
    console.error('Error loading MaxMind database:', error);
    process.exit(1);
  }
})();

// Function to get IP information
const getIPInfo = async (ip) => {
  if (!lookup) {
    throw new Error('MaxMind database is not initialized.');
  }
  return lookup.get(ip);
};

module.exports = { getIPInfo };
