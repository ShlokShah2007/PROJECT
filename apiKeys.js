/**
 * Centralized access to third-party API keys/secrets.
 * Never read process.env directly elsewhere — go through here so every
 * key has one place to rotate, log access to, and validate on boot.
 */

const REQUIRED_KEYS = ['ANTHROPIC_API_KEY', 'JWT_SECRET', 'DATABASE_URL'];

function validateEnv() {
  const missing = REQUIRED_KEYS.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function getKey(name) {
  const value = process.env[name];
  if (!value) throw new Error(`API key "${name}" is not configured`);
  return value;
}

module.exports = { validateEnv, getKey };
