"use client";

import { useCallback, useState } from "react";
import { EnrollMFA } from "./EnrollMFA";
import { ManageMFA } from "./ManageMFA";

interface MFAFactor {
  id: string;
  friendly_name?: string;
  factor_type: string;
  status: string;
  created_at: string;
}

interface MFASettingsProps {
  initialFactors: MFAFactor[];
  userEmail: string;
}

export function MFASettings({ initialFactors, userEmail }: MFASettingsProps) {
  const [factors] = useState<MFAFactor[]>(initialFactors);
  const [showEnrollment, setShowEnrollment] = useState(false);

  const handleEnrolled = useCallback(() => {
    setShowEnrollment(false);
    // Refresh the page to get updated factors
    window.location.reload();
  }, []);

  const handleCancelled = useCallback(() => {
    setShowEnrollment(false);
  }, []);

  const handleFactorRemoved = useCallback(() => {
    // Refresh the page to get updated factors
    window.location.reload();
  }, []);

  const hasMFAEnabled = factors.some((factor) => factor.status === "verified");

  if (showEnrollment) {
    return (
      <EnrollMFA onEnrolled={handleEnrolled} onCancelled={handleCancelled} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Signed in as: <span className="font-medium">{userEmail}</span>
        </p>

        {!hasMFAEnabled ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Recommendation:</strong> Enable two-factor authentication
              to secure your account.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800">
              <strong>Great!</strong> Your account is protected with two-factor
              authentication.
            </p>
          </div>
        )}
      </div>

      <ManageMFA factors={factors} onFactorRemoved={handleFactorRemoved} />

      {!showEnrollment && (
        <div className="text-center">
          <button
            onClick={() => setShowEnrollment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {hasMFAEnabled
              ? "Add Another Factor"
              : "Set up Two-Factor Authentication"}
          </button>
        </div>
      )}
    </div>
  );
}
