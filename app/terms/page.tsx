import Link from "next/link";
import { studio } from "@/lib/content";

export const metadata = {
  title: "Terms of Service — Studio Rocinante",
};

const sections = [
  {
    title: "The service",
    body: `Studio Rocinante provides online presence management for local businesses. This includes Google Business Profile setup and management, website design and hosting, and custom review cards — depending on the package you choose.`,
  },
  {
    title: "Pricing and payment",
    body: `Each package has a one-time setup fee and a monthly subscription. Your card is charged the setup fee immediately at checkout, and then monthly on the same date going forward. All prices are in CAD unless otherwise stated.`,
  },
  {
    title: "Cancellation",
    body: `You can cancel anytime. No lock-in, no cancellation fees. When you cancel, your subscription stops at the end of the current billing period. Setup fees are non-refundable.`,
  },
  {
    title: "What we need from you",
    body: `To get started, we'll need access to your Google account (or we can create one for you), your business details, and any photos or branding you have. We'll reach out after you sign up.`,
  },
  {
    title: "What we deliver",
    body: `We aim to have your Google listing live within 5 business days of receiving your information. Websites typically take 2–3 weeks. Review cards are shipped within 7 business days.`,
  },
  {
    title: "Results",
    body: `We do our best to improve your visibility on Google, but we cannot guarantee specific rankings or a specific number of reviews. Search results depend on many factors outside our control.`,
  },
  {
    title: "Limitation of liability",
    body: `Studio Rocinante is not liable for any indirect or consequential losses arising from the use of our services. Our total liability is limited to the amount you paid in the last 30 days.`,
  },
  {
    title: "Changes",
    body: `We may update these terms from time to time. We'll notify you by email if anything significant changes.`,
  },
  {
    title: "Contact",
    body: `Questions? Email us at ${studio.email}.`,
  },
];

export default function TermsPage() {
  return (
    <div className="paper-grain min-h-screen bg-paper text-ink">
      <header>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
            Studio Rocinante
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Legal</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-soft">Last updated: July 2026</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-6 px-6">
          <Link href="/terms" className="font-mono text-xs text-ink-soft hover:text-ink">Terms</Link>
          <Link href="/privacy" className="font-mono text-xs text-ink-soft hover:text-ink">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
