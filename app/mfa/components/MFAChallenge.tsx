"use client";

import { useState } from "react";
import { challengeMFA } from "../actions";

interface MFAChallengeProps {
  factorId: string;
  factorType: string;
}

export function MFAChallenge({ factorId, factorType }: MFAChallengeProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await challengeMFA(factorId, code);
      // Redirect happens in the server action
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the code from your{" "}
            {factorType === "totp" ? "authenticator app" : "phone"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              placeholder="Enter 6-digit code"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-center font-mono placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
