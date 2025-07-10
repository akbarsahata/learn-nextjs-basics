import { eq } from "drizzle-orm";
import { eventsTable } from "./tables";
import { Db, EventInsert, EventUpdate } from "./types";

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
