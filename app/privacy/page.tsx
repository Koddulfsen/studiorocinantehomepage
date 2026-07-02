import Link from "next/link";
import { studio } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy — Studio Rocinante",
};

const sections = [
  {
    title: "What we collect",
    body: `When you contact us or sign up for our services, we collect your name, email address, business name, and phone number. When you pay, your payment is processed by Stripe — we never see or store your card details.`,
  },
  {
    title: "How we use it",
    body: `We use your information to provide and manage your services, send you monthly reports, and get in touch about your account. We do not sell your data. We do not use it for advertising.`,
  },
  {
    title: "Third parties",
    body: `We use Stripe to process payments. We use Google services (Google Business Profile, Google Maps) as part of the services we provide to you. These third parties have their own privacy policies.`,
  },
  {
    title: "Data retention",
    body: `We keep your information for as long as your account is active. If you cancel, we delete your personal data within 30 days. Payment records may be retained longer where required by law.`,
  },
  {
    title: "Your rights",
    body: `You can ask us to access, correct, or delete your data at any time. Just email us and we'll take care of it.`,
  },
  {
    title: "Contact",
    body: `Questions? Email us at ${studio.email}.`,
  },
];

export default function PrivacyPage() {
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
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight">Privacy Policy</h1>
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
