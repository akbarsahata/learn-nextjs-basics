export const dynamic = 'force-dynamic'; // Ensures SSR

export default async function SSRPage() {
  const time = new Date().toISOString();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main>
        <h1>Next.js SSR Demo</h1>
        <p>Server rendered at: {time}</p>
      </main>
    </div>
  );
}
