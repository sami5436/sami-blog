import { NextRequest, NextResponse } from "next/server";
import { addArticle } from "@/lib/store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "morning";

export async function POST(req: NextRequest) {
    try {
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

        const article = addArticle({
            title,
            url: url || null,
            summary,
            tags: tags || [],
        });

        return NextResponse.json({ article }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to submit article" },
            { status: 500 }
        );
    }
}
