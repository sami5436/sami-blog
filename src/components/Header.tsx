import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-baseline justify-between pt-10 pb-8 border-b border-border mb-10">
            <Link href="/" className="group">
                <h1 className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-foreground">
                    morning paper
                </h1>
                <p className="font-[family-name:var(--font-heading)] text-xs text-muted mt-0.5 tracking-wide">
                    daily reading log
                </p>
            </Link>
            <nav className="flex gap-6">
                <Link
                    href="/"
                    className="font-[family-name:var(--font-heading)] text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                    feed
                </Link>
                <Link
                    href="/submit"
                    className="font-[family-name:var(--font-heading)] text-sm text-accent hover:text-accent-light transition-colors duration-200"
                >
                    + new
                </Link>
            </nav>
        </header>
    );
}
