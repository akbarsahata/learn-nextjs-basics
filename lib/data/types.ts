import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";
import { eventsTable, galleriesTable } from "./tables";
import { db } from './db';

export const eventsTableInsertSchema = createInsertSchema(eventsTable);
export const eventsTableSelectSchema = createSelectSchema(eventsTable);
export const eventsTableUpdateSchema = createUpdateSchema(eventsTable);

export type EventInsert = z.infer<typeof eventsTableInsertSchema>;
export type EventSelect = z.infer<typeof eventsTableSelectSchema>;
export type EventUpdate = z.infer<typeof eventsTableUpdateSchema>;

export const galleriesInsertSchema = createInsertSchema(galleriesTable);
export const galleriesSelectSchema = createSelectSchema(galleriesTable);
export const galleriesUpdateSchema = createUpdateSchema(galleriesTable);

export type GalleryInsert = z.infer<typeof galleriesInsertSchema>;
export type GallerySelect = z.infer<typeof galleriesSelectSchema>;
export type GalleryUpdate = z.infer<typeof galleriesUpdateSchema>;

export type Db = typeof db
