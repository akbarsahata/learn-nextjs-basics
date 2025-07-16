import { eq } from "drizzle-orm";
import { eventsTable, galleriesTable } from "./tables";
import { Db, EventInsert, EventUpdate, GalleryInsert } from "./types";

export const eventsRepository = {
  async getAll(db: Db) {
    return db.query.eventsTable.findMany();
  },
  async getById(db: Db, id: string) {
    return db.query.eventsTable.findFirst({
      where: (events, { eq }) => eq(events.id, id),
    });
  },
  async create(db: Db, data: EventInsert) {
    return db.insert(eventsTable).values(data).returning();
  },
  async update(db: Db, id: string, data: EventUpdate) {
    return db
      .update(eventsTable)
      .set(data)
      .where(eq(eventsTable.id, id))
      .returning();
  },
  async delete(db: Db, id: string) {
    return db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();
  },
};

export const galleriesRepository = {
  async getAll(db: Db) {
    return db.query.galleriesTable.findMany({
      orderBy: (galleries, { desc }) => desc(galleries.updatedAt),
    })
  },
  async getById(db: Db, id: string) {
    return db.query.galleriesTable.findFirst({
      where: (galleries, { eq }) => eq(galleries.id, id),
    });
  },
  async getByImageUrl(db: Db, imageUrl: string) {
    return db.query.galleriesTable.findFirst({
      where: (galleries, { eq }) => eq(galleries.imageUrl, imageUrl),
    });
  },
  async create(db: Db, data: GalleryInsert) {
    return db.insert(galleriesTable).values(data).returning();
  },
  async update(db: Db, id: string, data: Partial<GalleryInsert>) {
    return db
      .update(galleriesTable)
      .set(data)
      .where(eq(galleriesTable.id, id))
      .returning();
  },
  async delete(db: Db, id: string) {
    return db
      .delete(galleriesTable)
      .where(eq(galleriesTable.id, id))
      .returning();
  },
};
