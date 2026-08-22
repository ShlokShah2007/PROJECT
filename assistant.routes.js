const express = require('express');
const { requireAuth } = require('../../backend/src/middleware/auth');
const { askTripAssistant } = require('./assistant.service');

const router = express.Router();

// POST /api/assistant/chat — powers the "chat with your trip assistant" feature
router.post('/chat', requireAuth, async (req, res, next) => {
  try {
    const { message, tripContext } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }
    const reply = await askTripAssistant({ message, tripContext, userId: req.user.id });
    res.json({ reply });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
