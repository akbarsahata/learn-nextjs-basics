"use client";

import { useState } from "react";
import { unenrollMFA } from "../actions";

interface MFAFactor {
  id: string;
  friendly_name?: string;
  factor_type: string;
  status: string;
  created_at: string;
}

interface ManageMFAProps {
  factors: MFAFactor[];
  onFactorRemoved: () => void;
}

export function ManageMFA({ factors, onFactorRemoved }: ManageMFAProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUnenroll = async (factorId: string) => {
    if (
      !confirm(
        "Are you sure you want to disable this MFA factor? This will reduce your account security."
      )
    ) {
      return;
    }

    setError("");
    setLoading(factorId);

    try {
      const result = await unenrollMFA(factorId);

      if (result.success) {
        onFactorRemoved();
      } else {
        setError(result.error || "Failed to remove MFA factor");
      }
    } catch {
      setError("Failed to remove MFA factor");
    } finally {
      setLoading(null);
    }
  };

  if (factors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No MFA factors configured</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your MFA Factors</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {factors.map((factor) => (
          <div
            key={factor.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {factor.factor_type === "totp"
                      ? "Authenticator App"
                      : "Phone"}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      factor.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {factor.status}
                  </span>
                </div>

                {factor.friendly_name && (
                  <p className="text-sm text-gray-600 mt-1">
                    {factor.friendly_name}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Added: {new Date(factor.created_at).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400 mt-1 font-mono">
                  ID: {factor.id}
                </p>
              </div>

              <button
                onClick={() => handleUnenroll(factor.id)}
                disabled={loading === factor.id}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {loading === factor.id ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
