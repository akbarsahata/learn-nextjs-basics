import Link from "next/link";

export function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
    >
      Back to Home
    </Link>
  );
}
