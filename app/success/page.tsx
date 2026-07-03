import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

async function getPackageName(sessionId: string | undefined): Promise<string | null> {
  if (!sessionId) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const item = session.line_items?.data?.find((li) =>
      li.description && !li.description.includes("Setup Fee")
    );
    return item?.description ?? null;
  } catch {
    return null;
  }
}

export const metadata = { title: "You're in — Studio Rocinante" };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const packageName = await getPackageName(session_id);

  return (
    <div className="paper-grain min-h-screen bg-paper text-ink flex flex-col">

      <header className="mx-auto w-full max-w-3xl px-6 py-5">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
          Studio Rocinante
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">

        {/* Confirmation pill */}
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-deep">
          ✓ Payment confirmed
        </p>

        {/* Windmill */}
        <Image
          src="/windmill.png"
          alt="Studio Rocinante windmill"
          width={400}
          height={400}
          priority
          className="my-8 h-auto w-44 mix-blend-multiply sm:w-52"
        />

        {/* Headline */}
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          You're in.
        </h1>

        {packageName && (
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            {packageName}
          </p>
        )}

        {/* Handwritten accent */}
        <p className="mt-3 font-hand text-2xl text-gold-deep sm:text-3xl">
          Consider it handled.
        </p>

        <div className="my-8 h-px w-16 bg-ink/10" />

        {/* Body */}
        <p className="max-w-sm text-base leading-relaxed text-ink-soft">
          Check your inbox — we've just sent you a short welcome email with
          one simple question so we can find your business on Google and get to work.
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          We'll have your audit done and be back in touch within{" "}
          <span className="font-semibold text-ink">2 business days.</span>
        </p>

        {/* What happens next */}
        <div className="mt-12 w-full max-w-xs text-left">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
            What happens next
          </p>
          <ol className="space-y-5">
            {([
              ["Reply to the welcome email", "Just your business name and address — that's all we need for now."],
              ["We audit your online presence", "We check your Google listing, directories, and everything relevant to your package."],
              ["You hear back from us", "A personalised action plan and everything we need to kick things off."],
            ] as const).map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-gold-deep">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 text-sm text-ink-soft">
          Questions?{" "}
          <a
            href="mailto:hello@studiorocinante.com"
            className="text-ink underline decoration-1 underline-offset-4 hover:text-gold-deep transition-colors"
          >
            hello@studiorocinante.com
          </a>
        </p>

      </main>

      <footer className="py-8 text-center">
        <p className="font-mono text-xs text-ink-soft">© 2026 Studio Rocinante</p>
      </footer>

    </div>
  );
}
