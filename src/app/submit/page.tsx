import SubmitForm from "@/components/SubmitForm";

export default function SubmitPage() {
    return (
        <main>
            <div className="mb-8 fade-up">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    log a read
                </h2>
                <p className="text-sm text-muted mt-1">
                    what did you read today? jot down what stuck with you.
                </p>
            </div>
            <SubmitForm />
        </main>
    );
}
