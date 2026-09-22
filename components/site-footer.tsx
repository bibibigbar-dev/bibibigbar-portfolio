import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] py-10">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-2xl font-bold text-[var(--sky-deep)]">Living in Dallas</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            A neighbor-to-neighbor space for settling into DFW life — housing, food, jobs, and everyday tips.
          </p>
        </div>
        <div className="flex gap-4 text-sm font-semibold text-[var(--muted)]">
          <Link href="/boards">Boards</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register">Join</Link>
        </div>
      </div>
    </footer>
  );
}
