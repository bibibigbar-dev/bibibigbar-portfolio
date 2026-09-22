"use client";

import { useState, useTransition } from "react";

interface AuthFormProps {
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  title: string;
  subtitle: string;
  submitLabel: string;
  includeName?: boolean;
}

export function AuthForm({
  action,
  title,
  subtitle,
  submitLabel,
  includeName = false,
}: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="container py-14">
      <div className="mx-auto max-w-md surface animate-rise rounded-[2rem] p-8 shadow-[var(--shadow)]">
        <p className="display text-3xl font-bold text-[var(--sky-deep)]">{title}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
        {error ? (
          <p className="mt-4 rounded-2xl bg-[rgba(180,35,24,0.08)] px-4 py-3 text-sm text-[#b42318]">
            {error}
          </p>
        ) : null}
        <form action={handleSubmit} className="mt-6 grid gap-4">
          {includeName ? (
            <label className="field">
              <span>Name</span>
              <input name="name" required placeholder="Your name" />
            </label>
          ) : null}
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@email.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </label>
          <button type="submit" className="btn btn-primary mt-2 w-full" disabled={isPending}>
            {isPending ? "Please wait…" : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
