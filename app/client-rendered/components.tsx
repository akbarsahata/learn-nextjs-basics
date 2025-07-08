"use client";

import { use, useState } from "react";

export function ClientRenderedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white p-8 rounded shadow flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Client Rendered Counter</h1>
      <p className="text-lg mb-6">
        Current count: <span className="font-mono">{count}</span>
      </p>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export function ClientRenderedFetch({
  adviceResponse,
}: {
  adviceResponse: Promise<{ slip: { id: number; advice: string } }>;
}) {
  const advice = use(adviceResponse);
  return (
    <div className="bg-white p-8 rounded shadow flex flex-col items-center">
      <h2 className="text-xl font-semibold">Advice for today</h2>
      <p className="text-lg mt-4">{advice.slip.advice}</p>
      <small className="text-gray-500 mt-2">
        This page is rendered on the client side.
      </small>
    </div>
  );
}
