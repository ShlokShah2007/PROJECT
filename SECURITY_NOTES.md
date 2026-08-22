# Security notes

The uploaded `frontend/index.html` is explicitly a client-only demo — it
says so in the login modal ("accounts live only in this browser tab,
nothing is sent anywhere"). Wiring it to a real backend introduces risk
that didn't exist before. Checklist for going live:

- [ ] Passwords hashed with bcrypt (12+ rounds) — never stored/compared in plaintext (see `backend/src/routes/auth.routes.js`)
- [ ] Real password policy enforced server-side (`passwordPolicy.js`), not just the `minlength="4"` HTML attribute
- [ ] JWT secret is a long random value, stored outside source control
- [ ] `helmet` + CORS allow-list in place (`backend/src/server.js`)
- [ ] Rate limiting on `/api/auth/*` to slow brute force (`backend/src/middleware/rateLimit.js`)
- [ ] All free-text fields (trip name, search query) escaped before ever being rendered as HTML (`sanitize.js`)
- [ ] Parameterized SQL everywhere (the scaffold uses `pg` with `$1`-style params — never string-concatenate SQL)
- [ ] AI assistant calls scoped per-user and rate-limited (`api-management/usageTracking.js`) so one user can't exhaust the Anthropic API budget
- [ ] Secrets (`ANTHROPIC_API_KEY`, `DATABASE_URL`, `JWT_SECRET`) only ever read via `api-management/apiKeys.js`, never hardcoded
