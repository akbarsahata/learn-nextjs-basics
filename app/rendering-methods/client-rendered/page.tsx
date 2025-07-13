import { Suspense } from "react";
import { ClientRenderedCounter, ClientRenderedFetch } from "./components";

export default function Page() {
  const adviceResponse = fetch("https://api.adviceslip.com/advice").then(
    (res) => res.json()
  );

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen min-w-[100vh] bg-gray-100">
      <ClientRenderedCounter />
      <Suspense
        fallback={<div className="text-gray-500">Loading advice...</div>}
      >
        <ClientRenderedFetch adviceResponse={adviceResponse} />
      </Suspense>
    </div>
  );
}
