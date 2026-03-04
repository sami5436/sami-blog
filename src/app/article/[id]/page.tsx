import { getArticle } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    const date = new Date(article.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <main className="fade-up">
            {/* Back link */}
            <Link
                href="/"
                className="font-[family-name:var(--font-heading)] text-xs text-muted hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 mb-8"
            >
                <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                back to feed
            </Link>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground leading-snug mb-3">
                {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-8">
                <span className="font-[family-name:var(--font-heading)] text-xs text-muted">
                    {date}
                </span>
                {article.url && (
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-heading)] text-xs text-accent hover:text-accent-light transition-colors duration-200 inline-flex items-center gap-1"
                    >
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        original article
                    </a>
                )}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
                <div className="flex gap-2 mb-8">
                    {article.tags.map((tag) => (
                        <span
                            key={tag}
                            className="tag text-muted bg-border/50 px-2 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Summary / body */}
            <div className="border-t border-border pt-8">
                <p className="text-foreground leading-[1.8] text-[15px]">
                    {article.summary}
                </p>
            </div>
        </main>
    );
}
