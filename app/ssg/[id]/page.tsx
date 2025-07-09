import { Catalog, catalogs } from "@/lib/data/mock-data";

// /app/ssg/page.tsx
async function getCatalogData(catalogId: string): Promise<Catalog | undefined> {
  // Simulate fetching data for the catalog
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(catalogs.find((catalog) => catalog.id === catalogId));
    }, 1000);
  });
}

export async function generateStaticParams() {
  return catalogs.map((catalog) => ({
    catalog: catalog.id,
  }));
}

export default async function SSGPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCatalogData(id);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Catalog: {data?.name}</h1>
        <p className="text-gray-700">{data?.description}</p>
        <p className="mt-4 text-sm text-gray-500">
          This page is statically generated at build time.{" "}
          {new Date().toLocaleString()}
        </p>
      </main>
    </div>
  );
}
