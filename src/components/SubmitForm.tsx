"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitForm() {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.get("title"),
                    url: formData.get("url") || null,
                    summary: formData.get("summary"),
                    tags: String(formData.get("tags") || "")
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    password: formData.get("password"),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            setShowSuccess(true);
            form.reset();

            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (showSuccess) {
        return (
            <div className="pop flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">&#x2728;</span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-foreground mb-2">
                    logged
                </h2>
                <p className="text-sm text-muted">
                    streak updated — redirecting to feed...
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 fade-up">
            {error && (
                <div className="font-[family-name:var(--font-heading)] text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-wider mb-2 block"
                >
                    title
                </label>
                <input
                    ref={titleRef}
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="What did you read?"
                    className="w-full bg-transparent border-b-2 border-border focus:border-accent outline-none py-2 text-foreground font-[family-name:var(--font-heading)] text-lg transition-colors duration-200 placeholder:text-muted/40"
                />
            </div>

            {/* URL */}
            <div>
                <label
                    htmlFor="url"
                    className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-wider mb-2 block"
                >
                    link{" "}
                    <span className="normal-case tracking-normal text-muted/60">
                        (optional)
                    </span>
                </label>
                <input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://..."
                    className="w-full bg-transparent border-b-2 border-border focus:border-accent outline-none py-2 text-foreground text-sm transition-colors duration-200 placeholder:text-muted/40"
                />
            </div>

            {/* Summary */}
            <div>
                <label
                    htmlFor="summary"
                    className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-wider mb-2 block"
                >
                    your takeaway
                </label>
                <textarea
                    id="summary"
                    name="summary"
                    required
                    rows={5}
                    placeholder="What stuck with you? What's worth remembering?"
                    className="w-full bg-transparent border-2 border-border focus:border-accent outline-none p-3 text-foreground text-sm leading-relaxed rounded-lg resize-y transition-colors duration-200 placeholder:text-muted/40"
                />
            </div>

            {/* Tags */}
            <div>
                <label
                    htmlFor="tags"
                    className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-wider mb-2 block"
                >
                    tags{" "}
                    <span className="normal-case tracking-normal text-muted/60">
                        (comma-separated)
                    </span>
                </label>
                <input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="psychology, science, tech"
                    className="w-full bg-transparent border-b-2 border-border focus:border-accent outline-none py-2 text-foreground text-sm transition-colors duration-200 placeholder:text-muted/40"
                />
            </div>

            {/* Password */}
            <div className="pt-4 border-t border-border">
                <label
                    htmlFor="password"
                    className="font-[family-name:var(--font-heading)] text-xs text-muted uppercase tracking-wider mb-2 block"
                >
                    password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
                    className="w-full bg-transparent border-b-2 border-border focus:border-accent outline-none py-2 text-foreground text-sm transition-colors duration-200 placeholder:text-muted/40 max-w-[200px]"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="font-[family-name:var(--font-heading)] text-sm font-medium bg-foreground text-background px-8 py-3 rounded-lg hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isSubmitting ? "logging..." : "log it"}
            </button>
        </form>
    );
}
