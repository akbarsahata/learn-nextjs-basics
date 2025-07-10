import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";
import { eventsTable } from "./tables";
import { db } from './db';

export const eventsTableInsertSchema = createInsertSchema(eventsTable);
export const eventsTableSelectSchema = createSelectSchema(eventsTable);
export const eventsTableUpdateSchema = createUpdateSchema(eventsTable);

export type EventInsert = z.infer<typeof eventsTableInsertSchema>;
export type EventSelect = z.infer<typeof eventsTableSelectSchema>;
export type EventUpdate = z.infer<typeof eventsTableUpdateSchema>;

export type Db = typeof db
