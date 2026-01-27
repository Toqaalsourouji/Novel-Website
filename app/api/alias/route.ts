import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/src/lib/db";

const AliasSchema = z.object({
  alias: z.string().min(1).max(80).optional(),
  email: z.string().email().max(254).optional(),
}).refine((data) => data.alias || data.email, {
  message: "Either alias or email must be provided",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = AliasSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // If email is provided, generate an alias and send it
    if (data.email) {
      // Check if email already exists
      const existing = await query<{ id: string; alias: string }>(
        `SELECT id, alias FROM public.user_aliases WHERE email = $1`,
        [data.email]
      );

      if (existing.length > 0) {
        return NextResponse.json({ 
          ok: true, 
          alias: existing[0].alias,
          message: "Email already registered" 
        });
      }

      // Generate a random alias
      const generatedAlias = `PUNX_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const rows = await query<{ id: string; alias: string; created_at: string }>(
        `
        INSERT INTO public.user_aliases (alias, email, created_at)
        VALUES ($1, $2, NOW())
        RETURNING id, alias, created_at;
        `,
        [generatedAlias, data.email]
      );

      // TODO: Send email with alias
      // await sendAliasEmail(data.email, generatedAlias);

      return NextResponse.json({ 
        ok: true, 
        alias: rows[0].alias,
        message: "Alias sent to email" 
      }, { status: 201 });
    }

    // If alias is provided, check if it's available and save it
    if (data.alias) {
      const existing = await query<{ id: string }>(
        `SELECT id FROM public.user_aliases WHERE alias = $1`,
        [data.alias]
      );

      if (existing.length > 0) {
        return NextResponse.json({ 
          ok: false, 
          error: "Alias already taken" 
        }, { status: 409 });
      }

      const rows = await query<{ id: string; alias: string; created_at: string }>(
        `
        INSERT INTO public.user_aliases (alias, created_at)
        VALUES ($1, NOW())
        RETURNING id, alias, created_at;
        `,
        [data.alias]
      );

      return NextResponse.json({ 
        ok: true, 
        alias: rows[0].alias 
      }, { status: 201 });
    }

    return NextResponse.json({ 
      ok: false, 
      error: "Invalid request" 
    }, { status: 400 });

  } catch (err: any) {
    console.error("Alias API error:", err);
    
    // Duplicate entry (unique constraint)
    if (err?.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "Alias or email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
