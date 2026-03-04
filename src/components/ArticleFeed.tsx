"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/lib/db";
import { AVAILABLE_TAGS } from "@/lib/tags";

type ViewMode = "date" | "tag";

export default function ArticleFeed({ articles }: { articles: Article[] }) {
    const [view, setView] = useState<ViewMode>("date");
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [animKey, setAnimKey] = useState(0);

    // Collect tags that actually exist in articles
    const usedTags = AVAILABLE_TAGS.filter((tag) =>
        articles.some((a) => a.tags.includes(tag))
    );

    // Group by date
    const groupedByDate = articles.reduce<Record<string, Article[]>>(
        (acc, article) => {
            const date = new Date(article.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
            });
            if (!acc[date]) acc[date] = [];
            acc[date].push(article);
            return acc;
        },
        {}
    );

    // Group by tag
    const groupedByTag = articles.reduce<Record<string, Article[]>>(
        (acc, article) => {
            article.tags.forEach((tag) => {
                if (!acc[tag]) acc[tag] = [];
                acc[tag].push(article);
            });
            return acc;
        },
        {}
    );

    // Filtered articles for active tag
    const filteredArticles = activeTag
        ? articles.filter((a) => a.tags.includes(activeTag))
        : articles;

    function switchView(newView: ViewMode) {
        setView(newView);
        setActiveTag(null);
        setAnimKey((k) => k + 1);
    }

    function selectTag(tag: string) {
        setActiveTag(activeTag === tag ? null : tag);
        setAnimKey((k) => k + 1);
    }

    return (
        <div>
            {/* View toggle */}
            <div className="flex items-center gap-1 mb-6 font-[family-name:var(--font-heading)]">
                <button
                    onClick={() => switchView("date")}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${view === "date"
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                        }`}
                >
                    by date
                </button>
                <button
                    onClick={() => switchView("tag")}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${view === "tag"
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                        }`}
                >
                    by tag
                </button>
            </div>

            {/* Tag filter pills (only in tag view) */}
            {view === "tag" && (
                <div className="flex flex-wrap gap-1.5 mb-6 fade-up">
                    {usedTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => selectTag(tag)}
                            className={`tag px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${activeTag === tag
                                ? "bg-accent text-background border-accent"
                                : "bg-transparent text-muted border-border hover:border-foreground/30 hover:text-foreground"
                                }`}
                        >
                            {tag}
                            <span className="ml-1 opacity-50">
                                {groupedByTag[tag]?.length || 0}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Articles */}
            <div key={animKey} className={view === "date" ? "bucket-drop" : "shuffle-deal"}>
                {view === "date" && (
                    <div>
                        {Object.entries(groupedByDate).map(([date, dateArticles]) => (
                            <section key={date}>
                                <h3 className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-widest mb-1 mt-8 first:mt-0">
                                    {date}
                                </h3>
                                {dateArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </section>
                        ))}
                    </div>
                )}

                {view === "tag" && !activeTag && (
                    <div>
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}

                {view === "tag" && activeTag && (
                    <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-widest mb-1">
                            {activeTag}
                        </h3>
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}

                {articles.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-[family-name:var(--font-heading)] text-muted text-sm">
                            no entries yet
                        </p>
                        <p className="text-muted text-xs mt-1">
                            start your streak — log your first read
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
