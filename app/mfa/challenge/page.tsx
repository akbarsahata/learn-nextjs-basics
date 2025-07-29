import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { MFAChallenge } from "../components/MFAChallenge";

export default async function MFAChallengePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Get user's assurance level
  const { data: assuranceData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  // If user doesn't need MFA challenge, redirect to private page
  if (
    assuranceData?.currentLevel === "aal2" ||
    assuranceData?.nextLevel !== "aal2"
  ) {
    redirect("/private");
  }

  // Get user's factors to find the first TOTP factor
  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const totpFactor = factorsData?.totp?.[0];

  if (!totpFactor) {
    // No MFA factors configured, redirect to MFA setup
    redirect("/mfa");
  }

  return (
    <MFAChallenge
      factorId={totpFactor.id}
      factorType={totpFactor.factor_type}
    />
  );
}
