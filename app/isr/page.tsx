export const revalidate = 20; // Revalidate this page every 20 seconds

export default async function Page() {
  const res = await fetch("http://api.quotable.io/random");

  const data = await res.json();

  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg min-w-[340px] text-center">
        <h1 className="text-2xl font-bold mb-4">
          Next.js ISR Demo (App Router)
        </h1>
        <p className="mb-2">
          <strong>Quote:</strong> {data.content}
        </p>
        <p className="mb-4">
          <strong>Fetched at:</strong> {new Date().toLocaleTimeString()}
        </p>
        <small className="text-gray-500">
          This page uses <b>Incremental Static Regeneration</b> (ISR) with a 20s
          revalidation.
        </small>
      </div>
    </main>
  );
}
