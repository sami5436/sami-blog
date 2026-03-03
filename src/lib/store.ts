// Mock data store — will be replaced with Supabase later

export interface Article {
  id: string;
  title: string;
  url: string | null;
  summary: string;
  tags: string[];
  createdAt: string; // ISO date string
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastEntryDate: string | null; // YYYY-MM-DD
  entryDates: string[]; // array of YYYY-MM-DD for the calendar dots
}

// In-memory store (resets on server restart — fine for frontend dev)
const articles: Article[] = [
  {
    id: "1",
    title: "The Age of Magical Overthinking",
    url: "https://example.com/magical-overthinking",
    summary:
      "Explores how cognitive biases shape our daily decisions in the digital age. The author argues that our brains haven't evolved to handle the volume of choices we face today, leading to decision fatigue and anxiety. Key takeaway: awareness of these biases is the first step to making better choices.",
    tags: ["psychology", "cognition"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Why We Sleep",
    url: "https://example.com/why-we-sleep",
    summary:
      "Matthew Walker makes a compelling case for prioritizing sleep. REM sleep is critical for emotional regulation and creativity. Even one night of poor sleep can reduce immune function by 70%. I'm going to start treating my 8 hours as non-negotiable.",
    tags: ["health", "science"],
    createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
  },
  {
    id: "3",
    title: "Designing Data-Intensive Applications",
    url: null,
    summary:
      "Chapter on replication was eye-opening. The trade-offs between synchronous and asynchronous replication are more nuanced than I thought. Single-leader replication is good enough for most use cases, but multi-leader shines for geographically distributed systems.",
    tags: ["engineering", "databases"],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
];

const streak: StreakData = {
  currentStreak: 3,
  longestStreak: 7,
  lastEntryDate: new Date().toISOString().split("T")[0],
  entryDates: [
    new Date().toISOString().split("T")[0],
    new Date(Date.now() - 86400000).toISOString().split("T")[0],
    new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
    new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0],
    new Date(Date.now() - 86400000 * 6).toISOString().split("T")[0],
    new Date(Date.now() - 86400000 * 7).toISOString().split("T")[0],
    new Date(Date.now() - 86400000 * 8).toISOString().split("T")[0],
  ],
};

export function getArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getStreak(): StreakData {
  return { ...streak };
}

export function addArticle(data: {
  title: string;
  url: string | null;
  summary: string;
  tags: string[];
}): Article {
  const article: Article = {
    id: String(Date.now()),
    ...data,
    createdAt: new Date().toISOString(),
  };
  articles.unshift(article);

  // Update streak
  const today = new Date().toISOString().split("T")[0];
  if (streak.lastEntryDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (streak.lastEntryDate === yesterday) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1;
    }
    streak.longestStreak = Math.max(streak.currentStreak, streak.longestStreak);
    streak.lastEntryDate = today;
    if (!streak.entryDates.includes(today)) {
      streak.entryDates.push(today);
    }
  }

  return article;
}
