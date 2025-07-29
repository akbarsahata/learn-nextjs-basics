import { Separator } from "@/lib/ui/common";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 rounded-xl p-8 flex flex-col gap-4 bg-white min-w-[300px] shadow-md">
        <h1 className="font-extrabold text-3xl text-red-600 text-center animate-bounce mb-2">
          Next.JS Basics
        </h1>
        <Separator />
        <Link
          href="/rendering-methods"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          Rendering Methods
        </Link>
        <Separator />
        <Link
          href="/forms"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          Forms
        </Link>
        <Separator />
        <Link
          href="/gallery"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-gray-50 hover:bg-gray-100 transition"
        >
          Gallery
        </Link>
        <Separator />
        <Link
          href="/login"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-blue-50 hover:bg-blue-100 transition"
        >
          Authentication (Login)
        </Link>
        <Separator />
        <Link
          href="/private"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-green-50 hover:bg-green-100 transition"
        >
          Private Page (Protected)
        </Link>
        <Separator />
        <Link
          href="/mfa"
          className="py-3 rounded-lg border border-gray-200 text-center no-underline text-gray-800 bg-purple-50 hover:bg-purple-100 transition"
        >
          Two-Factor Authentication (2FA)
        </Link>
      </div>
    </div>
  );
}
