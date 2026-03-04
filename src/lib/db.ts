import { supabase } from "./supabase";

export interface Article {
    id: string;
    title: string;
    url: string | null;
    summary: string;
    tags: string[];
    created_at: string;
}

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastEntryDate: string | null;
}

// ---------------------
// Articles
// ---------------------

export async function getArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch articles:", error);
        return [];
    }
    return data || [];
}

export async function getArticle(id: string): Promise<Article | null> {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Failed to fetch article:", error);
        return null;
    }
    return data;
}

export async function addArticle(data: {
    title: string;
    url: string | null;
    summary: string;
    tags: string[];
}): Promise<Article | null> {
    const { data: article, error } = await supabase
        .from("articles")
        .insert({
            title: data.title,
            url: data.url,
            summary: data.summary,
            tags: data.tags,
        })
        .select()
        .single();

    if (error) {
        console.error("Failed to insert article:", error);
        return null;
    }

    // Update streak
    await updateStreak();

    return article;
}

// ---------------------
// Streaks
// ---------------------

export async function getStreak(): Promise<StreakData> {
    const { data, error } = await supabase
        .from("streaks")
        .select("*")
        .limit(1)
        .single();

    if (error || !data) {
        console.error("Failed to fetch streak:", error);
        return { currentStreak: 0, longestStreak: 0, lastEntryDate: null };
    }

    return {
        currentStreak: data.current_streak,
        longestStreak: data.longest_streak,
        lastEntryDate: data.last_entry_date,
    };
}

async function updateStreak() {
    const streak = await getStreak();
    const today = new Date().toISOString().split("T")[0];

    if (streak.lastEntryDate === today) {
        // Already logged today, no streak change
        return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let newCurrent: number;

    if (streak.lastEntryDate === yesterday) {
        newCurrent = streak.currentStreak + 1;
    } else {
        newCurrent = 1;
    }

    const newLongest = Math.max(newCurrent, streak.longestStreak);

    const { error } = await supabase
        .from("streaks")
        .update({
            current_streak: newCurrent,
            longest_streak: newLongest,
            last_entry_date: today,
        })
        .not("id", "is", null); // update all rows (there's only one)

    if (error) {
        console.error("Failed to update streak:", error);
    }
}
