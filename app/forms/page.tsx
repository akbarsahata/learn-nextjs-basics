import { Separator } from "@/lib/ui/common";
import { actionWithAdditionalArgument, handleFormSubmission } from "./actions";
import { FormWithActionState } from "./csr-forms";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-600">
          Multiple Form Examples
        </h1>
        <p className="text-gray-500 mb-4">
          This page demonstrates various form implementations in Next.js. See
          source code for details.
        </p>
        <Separator />
        <ServerRenderedForm />
        <Separator />
        <ActionWithAdditionalArgumentForm />
        <Separator />
        <FormWithActionState />
      </div>
    </div>
  );
}

async function ServerRenderedForm() {
  return (
    <div className="mt-4">
      <h2 className="text-gray-500 mb-4 text-xl">Basic Server-Rendered Form</h2>
      <form action={handleFormSubmission} className="flex flex-col gap-4">
        <input
          type="text"
          name="example"
          placeholder="See console for output"
          required
          className="border-2 rounded-sm p-1 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-black text-white font-semibold rounded-sm p-2 hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

async function ActionWithAdditionalArgumentForm() {
  const actionGivenAdditionalArgument = actionWithAdditionalArgument.bind(
    null,
    "12345",
    "abcde"
  );
  return (
    <div className="mt-4">
      <h2 className="text-gray-500 mb-4 text-xl">
        Form with Additional Arguments
      </h2>
      <form
        action={actionGivenAdditionalArgument}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="example"
          placeholder="See console for output"
          required
          className="border-2 rounded-sm p-1 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-black text-white font-semibold rounded-sm p-2 hover:bg-gray-800 transition-colors"
        >
          Submit with Args
        </button>
      </form>
    </div>
  );
}
