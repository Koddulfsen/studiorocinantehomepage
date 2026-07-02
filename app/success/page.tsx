import Link from "next/link";

export const metadata = {
  title: "You're in — Studio Rocinante",
};

export default function SuccessPage() {
  return (
    <div className="paper-grain min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">You're in.</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight">
        We'll be in touch shortly.
      </h1>
      <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
        We'll reach out within one business day to get everything set up. Keep an eye on your inbox.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-xs uppercase tracking-widest text-ink-soft underline underline-offset-4 hover:text-ink"
      >
        Back to home
      </Link>
    </div>
  );
}
