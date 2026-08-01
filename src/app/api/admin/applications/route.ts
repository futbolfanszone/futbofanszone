import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ applications: [], configured: false });
  }

  const status = req.nextUrl.searchParams.get("status");
  const type = req.nextUrl.searchParams.get("type");
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);
  if (type && type !== "all") query = query.eq("type", type);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load applications" }, { status: 500 });
  }

  return NextResponse.json({ applications: data || [], configured: true });
}
