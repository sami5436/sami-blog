// Predefined tags for article categorization
export const AVAILABLE_TAGS = [
    "science",
    "tech",
    "engineering",
    "health",
    "business",
    "design",
    "politics",
    "finance",
    "history",
    "self-improvement",
    "ai",
    "other",
] as const;

export type TagName = (typeof AVAILABLE_TAGS)[number];
