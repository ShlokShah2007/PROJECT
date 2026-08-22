# Database

PostgreSQL schema for GlobeTrotter.

- `migrations/001_init.sql` — core tables: `users`, `cities`, `trips`, `stops`, `activities`, `stop_activities`
- `seeds/001_cities.sql` — the same 9 cities currently hardcoded in the frontend demo, so the API returns real data instead of the in-browser `CITIES` array

## Setup
```bash
createdb globetrotter
psql globetrotter -f migrations/001_init.sql
psql globetrotter -f seeds/001_cities.sql
```

Point `backend/.env` `DATABASE_URL` at this database.
