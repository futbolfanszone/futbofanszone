import { NextRequest, NextResponse } from "next/server";
import { notifyAdminContact } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const limited = rateLimit(`contact:${ip}`, 5);
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Message sent." });
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Could not save your message." },
        { status: 500 },
      );
    }
  }

  try {
    await notifyAdminContact({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
  } catch (err) {
    console.error(err);
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Message could not be delivered. Configure email or database." },
        { status: 503 },
      );
    }
  }

  return NextResponse.json({ message: "Message sent." });
}
