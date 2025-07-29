import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "./actions";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  // Get MFA status
  const { data: assuranceData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const hasMFAEnabled = [
    ...(factorsData?.totp || []),
    ...(factorsData?.phone || []),
  ].some((factor) => factor.status === "verified");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to your private page!
        </h1>
        <p className="text-lg text-gray-600 mb-8">Hello {data.user.email}</p>

        <div className="space-y-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 mb-2">
              <strong>User ID:</strong> {data.user.id}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Last sign in:</strong>{" "}
              {new Date(data.user.last_sign_in_at || "").toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Security Level:</strong>
              <span
                className={`ml-2 inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                  assuranceData?.currentLevel === "aal2"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {assuranceData?.currentLevel === "aal2"
                  ? "High (2FA)"
                  : "Standard"}
              </span>
            </p>
            {!hasMFAEnabled && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  💡 Consider enabling 2FA for better security
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/mfa"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {hasMFAEnabled
              ? "Manage 2FA Settings"
              : "Set up Two-Factor Authentication"}
          </Link>

          <div>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
