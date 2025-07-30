"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function enrollMFA() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      friendlyName: crypto.randomUUID(),
      factorType: "totp",
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    };
  } catch (error) {
    console.error("MFA enrollment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to enroll MFA",
    };
  }
}

export async function verifyMFAEnrollment(factorId: string, code: string) {
  const supabase = await createClient();

  try {
    // Create challenge
    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError) {
      throw challengeError;
    }

    // Verify the code
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    if (verifyError) {
      throw verifyError;
    }

    revalidatePath("/mfa");
    return { success: true };
  } catch (error) {
    console.error("MFA verification error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to verify MFA code",
    };
  }
}

export async function unenrollMFA(factorId: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.mfa.unenroll({
      factorId,
    });

    if (error) {
      throw error;
    }

    // Refresh session to update assurance level
    await supabase.auth.refreshSession();

    revalidatePath("/mfa");
    return { success: true };
  } catch (error) {
    console.error("MFA unenroll error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to disable MFA",
    };
  }
}

export async function challengeMFA(factorId: string, code: string) {
  const supabase = await createClient();

  try {
    // Create challenge
    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError) {
      throw challengeError;
    }

    // Verify the code
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    if (verifyError) {
      throw verifyError;
    }

    // Redirect to protected page after successful MFA
    redirect("/private");
  } catch (error) {
    if (!isRedirectError(error)) {
      console.error("MFA challenge error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to verify MFA code"
      );
    }
  }
}
