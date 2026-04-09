import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; source?: string } | null;
  const email = body?.email?.trim();
  const source = body?.source?.trim();

  if (!email || !source) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("leads").insert({ email, source });
  if (error) {
    return NextResponse.json({ error: "Could not save lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

