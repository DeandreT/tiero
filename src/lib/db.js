import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as schema from './schema/tiers';

export const db = new Database('db.sqlite');
export const dDb = drizzle(db, { schema });
