import { Database } from 'bun:sqlite';

const db = new Database('db.sqlite');
db.exec('PRAGMA journal_mode = WAL;');

const createTable = async (/** @type {string} */ name, /** @type {string} */ schema) => {
	const query = db.query(`CREATE TABLE IF NOT EXISTS ${name} (${schema});`);
	query.run();
};

const createIndex = async (/** @type {string} */ tableName, /** @type {string} */ indexName, /** @type {string} */ columns) => {
  const query = db.query(`CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName} (${columns});`);
  query.run();
};

// Create tables if they don't exist
createTable(
	'tiers',
	`
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  list_id INTEGER NOT NULL,
  position INTEGER NOT NULL,
  color TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  last_updated INTEGER NOT NULL,
  updated_by INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  deleted_by INTEGER,
  deleted INTEGER
`
);
createTable(
	'lists',
	`
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  last_updated INTEGER NOT NULL,
  updated_by INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  deleted_by INTEGER,
  deleted INTEGER
`
);
createTable(
	'items',
	`
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
`
);

// Indexes for foreign keys
createIndex('items', 'idx_items_tier_id', 'tier_id');
createIndex('tiers', 'idx_tiers_list_id', 'list_id');

// Indexes for other frequently queried columns
createIndex('items', 'idx_items_position', 'position');
createIndex('tiers', 'idx_tiers_name', 'name');

export default db;
