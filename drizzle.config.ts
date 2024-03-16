import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema",
  database: "./db.sqlite",
  out: "./drizzle",
  driver: "libsql",
  dbCredentials: {
    url: "file:./db.sqlite"
  }
} as Config;