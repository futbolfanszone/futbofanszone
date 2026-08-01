import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SubscriberStatus = "pending" | "confirmed" | "unsubscribed";
export type ApplicationType = "quiz" | "job" | "general";
export type ApplicationStatus =
  | "new"
  | "shortlisted"
  | "picked"
  | "rejected";

export type Subscriber = {
  id: string;
  email: string;
  status: SubscriberStatus;
  confirm_token: string | null;
  source: string | null;
  created_at: string;
};

export type Application = {
  id: string;
  type: ApplicationType;
  name: string;
  email: string;
  phone: string | null;
  socials: Record<string, string> | null;
  message: string | null;
  extra: Record<string, unknown> | null;
  status: ApplicationStatus;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  if (!adminClient) {
    adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }

  return adminClient;
}
