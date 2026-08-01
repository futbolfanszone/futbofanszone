import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, setAdminSession } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const limited = rateLimit(`admin-login:${ip}`, 10);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (!checkAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
