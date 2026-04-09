import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        message?: string;
        source?: string;
        services?: string[];
        howFound?: string;
      }
    | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim() ?? null;
  const source = body?.source?.trim();
  const services = Array.isArray(body?.services) ? body?.services.filter(Boolean) : [];
  const howFound = body?.howFound?.trim() ?? null;

  if (!name || !email || !source) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    message,
    source,
    services,
    how_found: howFound,
  });

  if (error) {
    return NextResponse.json({ error: "Could not submit form." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

