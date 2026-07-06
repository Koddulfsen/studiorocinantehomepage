"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Packages & Pricing", href: "/services" },
  { label: "What we do", href: "/#services" },
  { label: "Free Audit", href: "/#audit", accent: true },
  { label: "Battles won", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <div className="flex flex-col items-start">
          <Link href="/" className="relative z-20 font-serif text-2xl font-semibold tracking-tight">
            studio rocinante.
          </Link>
          <span className="relative mt-1 w-fit">
            <span className="pointer-events-none absolute -inset-4 z-0 rounded-xl bg-paper opacity-100 blur-md md:hidden" />
            <p className="relative z-10 font-mono text-xs font-medium uppercase tracking-widest text-ink-soft">
              Online Presence Management
            </p>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-full z-20 border-t border-ink/10 bg-paper shadow-lg">
          <ul className="mx-auto flex max-w-3xl flex-col divide-y divide-ink/10 px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 font-mono text-xs font-medium uppercase tracking-widest hover:text-ink ${
                    link.accent ? "text-accent-teal" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
