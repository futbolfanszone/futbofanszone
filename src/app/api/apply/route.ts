import { NextRequest, NextResponse } from "next/server";
import {
  notifyAdminApplication,
  sendApplicationAck,
} from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { applySchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const limited = rateLimit(`apply:${ip}`, 5);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Application received." });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Applications are not connected yet. Add Supabase credentials to enable submissions.",
      },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("applications").insert({
    type: data.type,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone || null,
    socials: {
      instagram: data.instagram || "",
      tiktok: data.tiktok || "",
      youtube: data.youtube || "",
    },
    message: data.message,
    extra: {
      availability: data.availability || "",
      videoLink: data.videoLink || "",
    },
    status: "new",
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not save your application." },
      { status: 500 },
    );
  }

  try {
    await Promise.all([
      sendApplicationAck(data.email, data.name),
      notifyAdminApplication({
        name: data.name,
        email: data.email,
        type: data.type,
        phone: data.phone,
      }),
    ]);
  } catch (err) {
    console.error("Email notify failed", err);
  }

  return NextResponse.json({ message: "Application received." });
}
