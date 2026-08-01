import { randomUUID } from "crypto";
import { addToAudience, sendConfirmationEmail } from "./resend";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

export async function createPendingSubscription(
  email: string,
  source?: string,
) {
  if (!isSupabaseConfigured()) {
    return {
      ok: false as const,
      message:
        "Email list is not connected yet. Add Supabase credentials to enable signups.",
    };
  }

  const supabase = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();
  const token = randomUUID();

  const { data: existing } = await supabase
    .from("subscribers")
    .select("id, status")
    .eq("email", normalized)
    .maybeSingle();

  if (existing?.status === "confirmed") {
    return {
      ok: true as const,
      message: "You're already on the list.",
    };
  }

  const { error } = await supabase.from("subscribers").upsert(
    {
      email: normalized,
      status: "pending",
      confirm_token: token,
      source: source || "website",
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error(error);
    return {
      ok: false as const,
      message: "Could not save your email. Try again shortly.",
    };
  }

  try {
    await sendConfirmationEmail(normalized, token);
  } catch (err) {
    console.error(err);
    return {
      ok: false as const,
      message:
        "Saved, but confirmation email failed. Check Resend configuration.",
    };
  }

  return {
    ok: true as const,
    message: "Check your inbox to confirm your subscription.",
  };
}

export async function confirmSubscription(token: string) {
  if (!isSupabaseConfigured()) {
    return {
      ok: false as const,
      message: "Subscription service is not configured.",
    };
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("subscribers")
    .select("id, email, status")
    .eq("confirm_token", token)
    .maybeSingle();

  if (error || !data) {
    return {
      ok: false as const,
      message: "This confirmation link is invalid or has expired.",
    };
  }

  if (data.status === "confirmed") {
    return {
      ok: true as const,
      message: "Your subscription is already confirmed. Welcome back.",
    };
  }

  const { error: updateError } = await supabase
    .from("subscribers")
    .update({
      status: "confirmed",
      confirm_token: null,
    })
    .eq("id", data.id);

  if (updateError) {
    return {
      ok: false as const,
      message: "Could not confirm your subscription. Please try again.",
    };
  }

  try {
    await addToAudience(data.email);
  } catch (err) {
    console.error("Audience sync failed", err);
  }

  return {
    ok: true as const,
    message: "You're on the list. Watch for the weekly drop.",
  };
}
