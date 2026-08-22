-- GlobeTrotter core schema (PostgreSQL)

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cities (
  id       VARCHAR(64) PRIMARY KEY,   -- e.g. 'tokyo', 'lisbon'
  name     VARCHAR(255) NOT NULL,
  country  VARCHAR(255) NOT NULL,
  region   VARCHAR(255) NOT NULL,
  lat      DOUBLE PRECISION NOT NULL,
  lng      DOUBLE PRECISION NOT NULL,
  color    VARCHAR(16)
);

CREATE TABLE trips (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       VARCHAR(255) NOT NULL DEFAULT 'Untitled trip',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE stops (
  id         SERIAL PRIMARY KEY,
  trip_id    INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_id    VARCHAR(64) NOT NULL REFERENCES cities(id),
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL
);

CREATE TABLE activities (
  id          SERIAL PRIMARY KEY,
  city_id     VARCHAR(64) NOT NULL REFERENCES cities(id),
  name        VARCHAR(255) NOT NULL,
  cost        NUMERIC(10,2) DEFAULT 0
);

CREATE TABLE stop_activities (
  stop_id     INTEGER NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
  activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  PRIMARY KEY (stop_id, activity_id)
);

CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_stops_trip ON stops(trip_id);
CREATE INDEX idx_cities_name ON cities(name);
