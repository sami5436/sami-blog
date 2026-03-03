import Link from "next/link";
import { Article } from "@/lib/store";

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Link href={`/article/${article.id}`} className="block group">
            <article className="py-6 border-b border-border transition-colors duration-200 group-hover:bg-card-hover -mx-4 px-4 rounded-lg">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h2 className="font-[family-name:var(--font-heading)] text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                            {article.title}
                        </h2>
                        <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
                            {article.summary}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="tag text-muted bg-border/50 px-2 py-0.5 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <span className="font-[family-name:var(--font-heading)] text-xs text-muted whitespace-nowrap mt-1">
                        {timeAgo(article.createdAt)}
                    </span>
                </div>
                {article.url && (
                    <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                            className="w-3 h-3 text-muted"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                        <span className="text-xs text-muted truncate max-w-[200px]">
                            {new URL(article.url).hostname}
                        </span>
                    </div>
                )}
            </article>
        </Link>
    );
}
