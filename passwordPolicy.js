/**
 * The frontend demo accepts any 4+ character password. That's fine for a
 * client-only prototype but must not ship to a real backend — enforce a
 * real policy here before the account is created.
 */

const MIN_LENGTH = 10;

function validatePassword(password) {
  const problems = [];
  if (!password || password.length < MIN_LENGTH) {
    problems.push(`Password must be at least ${MIN_LENGTH} characters.`);
  }
  if (!/[A-Z]/.test(password)) problems.push('Add an uppercase letter.');
  if (!/[0-9]/.test(password)) problems.push('Add a number.');
  return { valid: problems.length === 0, problems };
}

module.exports = { validatePassword, MIN_LENGTH };
