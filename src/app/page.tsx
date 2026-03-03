import StreakWidget from "@/components/StreakWidget";
import ArticleCard from "@/components/ArticleCard";
import { getArticles, getStreak } from "@/lib/store";

export default function Home() {
  const articles = getArticles();
  const streak = getStreak();

  // Group articles by date
  const grouped = articles.reduce<Record<string, typeof articles>>(
    (acc, article) => {
      const date = new Date(article.createdAt).toLocaleDateString("en-US", {
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

  return (
    <main>
      <StreakWidget streak={streak} />

      <div className="stagger">
        {Object.entries(grouped).map(([date, articles]) => (
          <section key={date}>
            <h3 className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-widest mb-1 mt-8">
              {date}
            </h3>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </section>
        ))}

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
    </main>
  );
}
