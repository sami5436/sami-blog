import StreakWidget from "@/components/StreakWidget";
import ArticleFeed from "@/components/ArticleFeed";
import { getArticles, getStreak } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [articles, streak] = await Promise.all([getArticles(), getStreak()]);

  return (
    <main>
      <StreakWidget streak={streak} />
      <ArticleFeed articles={articles} />
    </main>
  );
}
