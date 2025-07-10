import { db } from "@/lib/data/db";
import { eventsRepository } from "@/lib/data/repositories";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const event = await eventsRepository.getById(db, id);
  return new Response(JSON.stringify({ data: event }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await request.json();

  const updateData = {
    ...data,
    id: undefined,
  };

  if (!id) {
    return new Response("ID is required for update", { status: 400 });
  }

  const updatedEvent = await eventsRepository.update(db, id, updateData);
  return new Response(JSON.stringify({ data: updatedEvent }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  if (!id) {
    return new Response("ID is required for deletion", { status: 400 });
  }

  const deletedEvent = await eventsRepository.delete(db, id);
  return new Response(JSON.stringify({ data: deletedEvent }), {
    headers: { "Content-Type": "application/json" },
  });
}
