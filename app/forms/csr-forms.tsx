"use client";

import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { actionWithFileUpload, actionWithSimulatedDelay } from "./actions";

export const initialState = {
  example: "",
  message: "",
};

export function FormWithActionState() {
  const [nextState, handleFormSubmission, pending] = useActionState(
    actionWithSimulatedDelay,
    initialState
  );
  return (
    <div className="mt-4">
      <h2 className="text-gray-500 mb-4 text-xl">Form with Action State</h2>
      <form action={handleFormSubmission} className="flex flex-col gap-4">
        <input
          type="text"
          name="example"
          placeholder="See console for output"
          required
          className="border-2 rounded-sm p-1 focus:outline-none focus:border-blue-500"
        />
        {nextState.message && (
          <p className="text-green-500">{nextState.message}</p>
        )}
        <button
          type="submit"
          className="bg-black text-white font-semibold rounded-sm p-2 hover:bg-gray-800 disabled:opacity-50 transition-colors flex gap-1 items-center justify-center"
          disabled={pending}
        >
          {pending && <Loader2Icon className="animate-spin" />}
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
}

export function PendingSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-black text-white font-semibold rounded-sm p-2 hover:bg-gray-800 disabled:opacity-50 transition-colors flex gap-1 items-center justify-center"
      disabled={pending}
    >
      {pending && <Loader2Icon className="animate-spin" />}
      <span>Submit</span>
    </button>
  );
}

export function FormWithUploadFile() {
  const initialState = {
    message: {
      error: "",
      success: "",
    },
    url: undefined,
  };

  const [nextState, setActionWithFileUpload] = useActionState(
    actionWithFileUpload,
    initialState
  );
  return (
    <form action={setActionWithFileUpload} className="flex flex-col gap-4">
      <input
        type="file"
        name="file"
        accept="image/*"
        required
        className="border-2 rounded-sm p-1 focus:outline-none focus:border-blue-500"
      />
      {nextState.message.error && (
        <p className="text-red-500">{nextState.message.error}</p>
      )}
      {nextState.message.success && (
        <div>
          <p className="text-green-500">{nextState.message.success}</p>
          {nextState.url && (
            <Link
              href={nextState.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Uploaded File
            </Link>
          )}
        </div>
      )}
      <PendingSubmitButton />
    </form>
  );
}
