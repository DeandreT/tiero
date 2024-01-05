import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
	db.parallelize(() => {
		db.run(
			`CREATE TABLE
    IF NOT EXISTS tiers (
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
    )`,
			function () {
				db.run(`INSERT INTO tiers (
        list_id,
        position,
        color,
        name,
        description,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        1,
        0,
        'red',
        'Test Tier 1',
        'This is a test tier',
        0,
        0,
        0,
        0
      )`);
				db.run(`INSERT INTO tiers (
        list_id,
        position,
        color,
        name,
        description,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        1,
        1,
        'blue',
        'Test Tier 2',
        'This is a test tier',
        0,
        0,
        0,
        0
      )`);
				db.run(`INSERT INTO tiers (
        list_id,
        position,
        color,
        name,
        description,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        1,
        2,
        'green',
        'Test Tier 3',
        'This is a test tier',
        0,
        0,
        0,
        0
      )`);
			}
		);

		db.run(
			`CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      last_updated INTEGER NOT NULL,
      updated_by INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      created_by INTEGER NOT NULL,
      deleted_by INTEGER,
      deleted INTEGER
    )`,
			function () {
				db.run(`INSERT INTO lists (
        name,
        description,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        'Test List',
        'This is a test list',
        0,
        0,
        0,
        0
      )`);
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS items (
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
    )`,
			function () {
				db.run(`INSERT INTO items (
        tier_id,
        position,
        name,
        description,
        image,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        1,
        0,
        'Test Item 1',
        'This is a test item',
        'https://via.placeholder.com/150',
        0,
        0,
        0,
        0
      )`);

				db.run(`INSERT INTO items (
        tier_id,
        position,
        name,
        description,
        image,
        last_updated,
        updated_by,
        created_at,
        created_by
      ) VALUES (
        1,
        1,
        'Test Item 2',
        'This is a test item',
        'https://via.placeholder.com/150',
        0,
        0,
        0,
        0
      )`);
			}
		);
	});
});

export default db;
