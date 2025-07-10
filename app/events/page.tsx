import React from "react";
import Link from "next/link";
import { db } from "@/lib/data/db";
import { eventsRepository } from "@/lib/data/repositories";

export default async function EventsPage() {
  // Fetch all events from the database
  const events = await eventsRepository.getAll(db);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <Link
            href="/events/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Event
          </Link>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No events found</div>
            <Link
              href="/events/create"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.description.length > 150
                    ? `${event.description.substring(0, 150)}...`
                    : event.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}