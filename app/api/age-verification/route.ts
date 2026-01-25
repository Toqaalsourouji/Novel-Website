import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/src/lib/db";

const AgeVerificationSchema = z.object({
    email: z.string().email().max(254),
    age_verified: z.boolean(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = AgeVerificationSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { ok: false, error: "Validation failed", issues: result.error.issues },
                { status: 400 }
            );
        }

        const { email, age_verified } = result.data;

        // Update user's age verification status
        const rows = await query<{ id: string; age_verified: boolean }>(
            `
            UPDATE public.initial_signups
            SET age_verified = $1, age_verification_date = $2
            WHERE email = $3
            RETURNING id, age_verified;
            `,
            [age_verified, age_verified ? new Date() : null, email]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { ok: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { ok: true, row: rows[0] },
            { status: 200 }
        );
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { ok: false, error: err?.message ?? "Server error" },
            { status: 500 }
        );
    }
}
