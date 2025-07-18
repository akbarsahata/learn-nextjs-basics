import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eventsTable, galleriesTable } from './tables';

const connection = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

export const db = drizzle(connection, {
  schema: {
    eventsTable,
    galleriesTable, // Ensure galleries table is included
  },
});
