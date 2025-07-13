import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 rounded-xl p-8 flex flex-col gap-4 bg-white min-w-[300px] shadow-md">
        <Link
          href="rendering-methods/ssr"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          SSR
        </Link>
        <Link
          href="rendering-methods/ssg"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          SSG
        </Link>
        <Link
          href="rendering-methods/isr"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          ISR
        </Link>
        <Link
          href="rendering-methods/client-rendered"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          Client Rendered
        </Link>
      </div>
    </div>
  );
}
