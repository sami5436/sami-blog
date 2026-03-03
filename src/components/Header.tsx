import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-baseline justify-between pt-8 sm:pt-10 pb-6 sm:pb-8 border-b border-border mb-8 sm:mb-10">
            <Link href="/" className="group">
                <h1 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                    sami&apos;s morning paper
                </h1>
                <p className="font-[family-name:var(--font-heading)] text-[10px] sm:text-xs text-muted mt-0.5 tracking-wide">
                    daily reading log
                </p>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
                <Link
                    href="/"
                    className="font-[family-name:var(--font-heading)] text-xs sm:text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                    feed
                </Link>
                <Link
                    href="/submit"
                    className="font-[family-name:var(--font-heading)] text-xs sm:text-sm text-accent hover:text-accent-light transition-colors duration-200"
                >
                    + new
                </Link>
            </nav>
        </header>
    );
}
