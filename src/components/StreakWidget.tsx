import { StreakData } from "@/lib/store";

function getDayLabel(daysAgo: number): string {
    const d = new Date(Date.now() - daysAgo * 86400000);
    return d.toLocaleDateString("en-US", { weekday: "narrow" });
}

function formatDate(daysAgo: number): string {
    const d = new Date(Date.now() - daysAgo * 86400000);
    return d.toISOString().split("T")[0];
}

export default function StreakWidget({ streak }: { streak: StreakData }) {
    const last30 = Array.from({ length: 30 }, (_, i) => {
        const date = formatDate(29 - i);
        return {
            date,
            active: streak.entryDates.includes(date),
            dayLabel: getDayLabel(29 - i),
        };
    });

    return (
        <div className="fade-up mb-8 sm:mb-12">
            {/* Streak count */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <span
                    className={`text-xl sm:text-2xl ${streak.currentStreak > 0 ? "flame-pulse" : ""}`}
                    role="img"
                    aria-label="streak flame"
                >
                    &#x1F525;
                </span>
                <div>
                    <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
                        {streak.currentStreak}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-xs sm:text-sm text-muted ml-1.5 sm:ml-2">
                        day streak
                    </span>
                </div>
            </div>

            <p className="font-[family-name:var(--font-heading)] text-[10px] sm:text-xs text-muted mb-4 sm:mb-5 ml-[1.85rem] sm:ml-[2.35rem]">
                longest: {streak.longestStreak} days
            </p>

            {/* 30-day calendar dots */}
            <div className="flex gap-[3px] sm:gap-[5px] items-end overflow-x-auto pb-1">
                {last30.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                            className={`w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] rounded-full transition-all duration-300 ${day.active
                                    ? "bg-streak-active scale-100"
                                    : "bg-streak-inactive scale-90 opacity-50"
                                }`}
                            title={day.date}
                        />
                    </div>
                ))}
            </div>

            {/* Day labels - show every 7th */}
            <div className="flex gap-[3px] sm:gap-[5px] mt-1">
                {last30.map((day, i) => (
                    <div key={i} className="w-[10px] sm:w-[14px] flex justify-center flex-shrink-0">
                        {i % 7 === 0 && (
                            <span className="text-[7px] sm:text-[9px] text-muted font-[family-name:var(--font-heading)]">
                                {day.dayLabel}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
