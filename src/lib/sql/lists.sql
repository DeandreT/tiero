CREATE TABLE
  IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    last_updated INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    deleted_by INTEGER,
    deleted INTEGER
  );