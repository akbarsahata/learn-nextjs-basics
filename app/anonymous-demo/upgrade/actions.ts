"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upgradeToEmailPassword(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.is_anonymous) {
    redirect("/login");
  }

  const email = formData.get("email") as string;
  // const password = formData.get("password") as string;

  try {
    // First, update the user's email
    const { error: emailError } = await supabase.auth.updateUser({
      email: email,
    });

    if (emailError) {
      // If email already exists, handle the conflict
      if (emailError.message.includes("already registered")) {
        return {
          success: false,
          error: "EMAIL_EXISTS",
          message:
            "This email is already registered. Please sign in to that account instead.",
        };
      }
      throw emailError;
    }

    // Note: In a real app, the user would need to verify their email first
    // Then they can set a password. For demo purposes, we'll set it directly.

    return {
      success: true,
      message:
        "Please check your email to verify your account, then you can set a password.",
    };
  } catch (error) {
    console.error("Upgrade error:", error);
    return {
      success: false,
      error: "UPGRADE_FAILED",
      message:
        error instanceof Error ? error.message : "Failed to upgrade account",
    };
  }
}

export async function linkExistingAccount(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user: anonymousUser },
  } = await supabase.auth.getUser();

  if (!anonymousUser || !anonymousUser.is_anonymous) {
    redirect("/login");
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Save anonymous user data
    const anonymousData = {
      cart: anonymousUser.user_metadata?.cart || [],
      notes: anonymousUser.user_metadata?.notes || [],
      userId: anonymousUser.id,
    };

    // Sign in to the existing account
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      return {
        success: false,
        error: "SIGNIN_FAILED",
        message: "Invalid email or password",
      };
    }

    // Merge the anonymous user's data with the existing account
    const existingUser = signInData.user;
    const existingCart = existingUser.user_metadata?.cart || [];
    const existingNotes = existingUser.user_metadata?.notes || [];

    // Merge carts (simple approach - could be more sophisticated)
    const mergedCart = [...existingCart, ...anonymousData.cart];
    const mergedNotes = [...existingNotes, ...anonymousData.notes];

    // Update the existing user with merged data
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        cart: mergedCart,
        notes: mergedNotes,
        migration: {
          fromAnonymous: true,
          migratedAt: new Date().toISOString(),
          originalAnonymousUserId: anonymousData.userId,
        },
      },
    });

    if (updateError) {
      throw updateError;
    }

    revalidatePath("/", "layout");
    redirect("/private?migrated=true");
  } catch (error) {
    console.error("Link account error:", error);
    return {
      success: false,
      error: "LINK_FAILED",
      message:
        error instanceof Error ? error.message : "Failed to link accounts",
    };
  }
}
