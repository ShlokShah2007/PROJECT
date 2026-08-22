const express = require('express');
const { requireAuth } = require('../middleware/auth');
const db = require('../services/db');

const router = express.Router();
router.use(requireAuth);

// List the current user's trips
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) { next(err); }
});

// Create a trip
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await db.query(
      'INSERT INTO trips (user_id, name) VALUES ($1,$2) RETURNING *',
      [req.user.id, name || 'Untitled trip']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

// Get one trip with its stops + activities
router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await db.query('SELECT * FROM trips WHERE id = $1 AND user_id = $2', [req.params.tripId, req.user.id]);
    if (!trip.rows.length) return res.status(404).json({ error: 'Trip not found' });

    const stops = await db.query(
      `SELECT s.*, c.name AS city_name, c.country, c.region
       FROM stops s JOIN cities c ON c.id = s.city_id
       WHERE s.trip_id = $1 ORDER BY s.start_date ASC`,
      [req.params.tripId]
    );
    res.json({ ...trip.rows[0], stops: stops.rows });
  } catch (err) { next(err); }
});

// Add a stop (city + date range) to a trip
router.post('/:tripId/stops', async (req, res, next) => {
  try {
    const { cityId, start, end } = req.body;
    const result = await db.query(
      'INSERT INTO stops (trip_id, city_id, start_date, end_date) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.params.tripId, cityId, start, end]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

// Remove a stop
router.delete('/:tripId/stops/:stopId', async (req, res, next) => {
  try {
    await db.query('DELETE FROM stops WHERE id = $1 AND trip_id = $2', [req.params.stopId, req.params.tripId]);
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
