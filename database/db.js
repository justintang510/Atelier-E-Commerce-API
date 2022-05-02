require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

db.on('error', (err, client) => {
  console.error('Error:', err);
});

module.exports = db;
