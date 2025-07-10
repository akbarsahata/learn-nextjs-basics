import React from "react";
import { saveEvent } from "./action";

export default function CreateEventPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                action={saveEvent}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
            >
                <h1 className="text-2xl font-bold text-center mb-4">Create Event</h1>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
}