/**
 * Lightweight per-user usage counter for rate-limited/paid endpoints
 * (e.g. AI assistant calls). Swap the in-memory Map for Redis in production
 * so counts survive restarts and work across multiple server instances.
 */

const usage = new Map(); // userId -> { count, windowStart }
const WINDOW_MS = 24 * 60 * 60 * 1000;
const DAILY_LIMIT = 50;

function checkAndIncrement(userId) {
  const now = Date.now();
  const entry = usage.get(userId);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    usage.set(userId, { count: 1, windowStart: now });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

module.exports = { checkAndIncrement, DAILY_LIMIT };
