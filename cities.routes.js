const express = require('express');
const db = require('../services/db');

const router = express.Router();

// GET /api/cities?q=tokyo — backs the globe search box
router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    let result;
    if (q) {
      result = await db.query(
        `SELECT * FROM cities
         WHERE name ILIKE $1 OR country ILIKE $1 OR region ILIKE $1
         LIMIT 20`,
        [`%${q}%`]
      );
    } else {
      result = await db.query('SELECT * FROM cities LIMIT 100');
    }
    res.json(result.rows);
  } catch (err) { next(err); }
});

module.exports = router;
