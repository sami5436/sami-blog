import { StreakData } from "@/lib/db";

export default function StreakWidget({ streak }: { streak: StreakData }) {
    return (
        <div className="fade-up mb-8 sm:mb-10">
            <p className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-foreground tabular-nums leading-none">
                {streak.currentStreak}
                <span className="text-base sm:text-lg font-medium text-foreground/70 ml-1.5">
                    day streak
                </span>
            </p>
            <p className="font-[family-name:var(--font-heading)] text-[11px] text-muted/60 mt-1.5 tracking-wide">
                longest: {streak.longestStreak} days
            </p>
        </div>
    );
}
