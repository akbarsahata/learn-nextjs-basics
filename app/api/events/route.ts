import { db } from "@/lib/data/db";
import { eventsRepository } from "@/lib/data/repositories";
import { eventsTableInsertSchema } from "@/lib/data/types";

export async function GET() {
  const events = await eventsRepository.getAll(db);
  return new Response(JSON.stringify({ data: events }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const data = eventsTableInsertSchema.parse(payload);
  const newEvent = await eventsRepository.create(db, data);
  return new Response(JSON.stringify({ data: newEvent }), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
