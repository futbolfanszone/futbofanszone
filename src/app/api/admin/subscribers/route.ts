import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      total: 0,
      confirmed: 0,
      pending: 0,
    });
  }

  const supabase = getSupabaseAdmin();
  const [totalRes, confirmedRes, pendingRes] = await Promise.all([
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed"),
    supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return NextResponse.json({
    configured: true,
    total: totalRes.count || 0,
    confirmed: confirmedRes.count || 0,
    pending: pendingRes.count || 0,
  });
}
