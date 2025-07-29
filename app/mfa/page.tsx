import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MFASettings } from "./components/MFASettings";

export default async function MFAPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Get user's MFA factors
  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const factors = factorsData
    ? [...factorsData.totp, ...factorsData.phone]
    : [];

  // Get assurance level
  const { data: assuranceData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Security Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your two-factor authentication
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Current Security Level:
            </span>
            <span
              className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                assuranceData?.currentLevel === "aal2"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {assuranceData?.currentLevel === "aal2"
                ? "High (2FA Enabled)"
                : "Standard"}
            </span>
          </div>
        </div>

        <MFASettings initialFactors={factors} userEmail={user.email || ""} />

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-4">
            <Link
              href="/private"
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-400 text-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
