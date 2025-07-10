import { db } from "@/lib/data/db";
import { eventsRepository } from "@/lib/data/repositories";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const event = await eventsRepository.getById(db, id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/events"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Events
          </Link>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.name}
          </h1>

          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </span>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {/* Event Metadata */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(event.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(event.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Link
            href={`/events/${event.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Event
          </Link>
          <Link
            href="/events"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}
