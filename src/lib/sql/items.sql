CREATE TABLE
  IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tier_id INTEGER NOT NULL,
    position INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    last_updated INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    deleted_by INTEGER,
    deleted INTEGER
  );