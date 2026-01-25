import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/src/lib/db";

const SignupSchema = z.object({
    full_name: z.string().min(1).max(80),
    email: z.string().email().max(254),
    age_range: z.string().min(1).max(20),
    region: z.string().min(2).max(80),
    language_preference: z.enum(["AR", "EN", "BOTH"]),
    age_verified: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = SignupSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { ok: false, error: "Validation failed", issues: result.error.issues },
                { status: 400 }
            );
        }
        const data = result.data;


        const rows = await query<{ id: string; created_at: string }>(
            `
      INSERT INTO public.initial_signups
        (full_name, email, age_range, region, language_preference, age_verified, age_verification_date)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at;
      `,
            [
                data.full_name,
                data.email,
                data.age_range,
                data.region,
                data.language_preference,
                data.age_verified,
                data.age_verified ? new Date() : null,
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

        console.error(err);
        return NextResponse.json(
            { ok: false, error: err?.message ?? "Server error" },
            { status: 500 }
        );

    }
}
