import { NextRequest, NextResponse } from "next/server";
import { addArticle } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "morning";

export async function POST(req: NextRequest) {
    try {
        // Rate limit by IP
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const { allowed, remaining } = rateLimit(ip);

        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests. Try again in a minute." },
                { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
            );
        }

        const body = await req.json();
        const { title, url, summary, tags, password } = body;

        // Password check
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Wrong password" }, { status: 401 });
        }

        // Validation
        if (!title || !summary) {
            return NextResponse.json(
                { error: "Title and summary are required" },
                { status: 400 }
            );
        }

        const article = await addArticle({
            title,
            url: url || null,
            summary,
            tags: tags || [],
        });

        if (!article) {
            return NextResponse.json(
                { error: "Failed to save article" },
                { status: 500 }
            );
        }

        return NextResponse.json({ article }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to submit article" },
            { status: 500 }
        );
    }
}
