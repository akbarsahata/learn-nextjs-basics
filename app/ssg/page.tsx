import Link from "next/link";
import { catalogs } from "@/lib/data/mock-data";

export default function SSGPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="gap-8 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold text-gray-600 mb-6">
          Next.js SSG Demo
        </h1>
        {catalogs.map((catalog) => (
          <div key={catalog.id} className="p-4 border rounded mb-4">
            <h2 className="text-xl font-semibold">{catalog.name}</h2>
            <p className="text-gray-700">{catalog.description}</p>
            <Link
              href={`/ssg/${catalog.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
