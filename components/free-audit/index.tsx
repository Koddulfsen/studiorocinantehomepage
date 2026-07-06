"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function FreeAuditForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      businessName: (form.elements.namedItem("businessName") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-sm text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-gold-deep">
          Request received
        </p>
        <p className="mt-3 font-serif text-xl font-semibold">We&rsquo;re on it.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We&rsquo;ll email your audit within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
      <Field label="Business name" name="businessName" type="text" />
      <Field label="Address" name="address" type="text" />
      <Field label="Email — we'll send results here" name="email" type="email" />

      {status === "error" && (
        <p className="mb-4 text-sm text-red-800">
          Something went wrong — please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium transition-colors hover:border-gold-deep hover:text-gold-deep disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Get my free audit →"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="mb-5 block text-left">
      <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-soft">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        className="mt-1.5 w-full border-b border-ink/20 bg-transparent py-1.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-gold-deep"
      />
    </label>
  );
}
