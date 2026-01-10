import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/src/lib/db";

const SignupSchema = z.object({
    full_name: z.string().min(1).max(80),
    email: z.string().email().max(254),
    age_range: z.string().min(1).max(20),
    region: z.string().min(2).max(80),
    language_preference: z.enum(["AR", "EN", "BOTH"]),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = SignupSchema.parse(body);

        const rows = await query<{ id: string; created_at: string }>(
            `
      INSERT INTO public.initial_signups
        (full_name, email, age_range, region, language_preference)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
      `,
            [
                data.full_name,
                data.email,
                data.age_range,
                data.region,
                data.language_preference,
            ]
        );

        return NextResponse.json({ ok: true, row: rows[0] }, { status: 201 });
    } catch (err: any) {
        // Duplicate email (unique constraint)
        if (err?.code === "23505") {
            return NextResponse.json(
                { ok: false, error: "Email already registered." },
                { status: 409 }
            );
        }

        return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
}
