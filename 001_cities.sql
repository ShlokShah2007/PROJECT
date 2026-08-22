-- Seed cities to match the CITIES array used by the frontend globe/search UI
INSERT INTO cities (id, name, country, region, lat, lng, color) VALUES
  ('lis', 'Lisbon',      'Portugal',     'Europe',        38.7223,  -9.1393, '#D97A4B'),
  ('mrk', 'Marrakesh',   'Morocco',      'Africa',        31.6295,  -7.9811, '#B8503A'),
  ('kyo', 'Kyoto',       'Japan',        'Asia',          35.0116, 135.7681, '#5C7A6B'),
  ('que', 'Queenstown',  'New Zealand',  'Oceania',      -45.0312, 168.6626, '#39616E'),
  ('lim', 'Lima',        'Peru',         'South America',-12.0464, -77.0428, '#8A5A3B'),
  ('ist', 'Istanbul',    'Türkiye',      'Europe',        41.0082,  28.9784, '#7A3F52'),
  ('ubu', 'Ubud',        'Indonesia',    'Asia',          -8.5069, 115.2625, '#4E6B4A'),
  ('cpt', 'Cape Town',   'South Africa', 'Africa',       -33.9249,  18.4241, '#3E6E7E'),
  ('osl', 'Oslo',        'Norway',       'Europe',        59.9139,  10.7522, '#2F4F5A')
ON CONFLICT (id) DO NOTHING;
