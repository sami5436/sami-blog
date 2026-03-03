import StreakWidget from "@/components/StreakWidget";
import ArticleFeed from "@/components/ArticleFeed";
import { getArticles, getStreak } from "@/lib/store";

export default function Home() {
  const articles = getArticles();
  const streak = getStreak();

  return (
    <main>
      <StreakWidget streak={streak} />
      <ArticleFeed articles={articles} />
    </main>
  );
}
