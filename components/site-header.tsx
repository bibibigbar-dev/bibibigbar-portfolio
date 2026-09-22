import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import type { Board, SessionUser } from "@/lib/types";

interface SiteHeaderProps {
  user: SessionUser | null;
  boards: Board[];
}

export function SiteHeader({ user, boards }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,250,252,0.88)] backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="display text-xl font-bold text-[var(--sky-deep)] sm:text-2xl">
          Living in Dallas
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--muted)] lg:flex">
          <Link href="/" className="hover:text-[var(--sky-deep)]">
            Home
          </Link>
          <div className="group relative">
            <Link href="/boards" className="hover:text-[var(--sky-deep)]">
              Boards
            </Link>
            <div className="pointer-events-none absolute left-0 top-full z-50 hidden min-w-[220px] pt-3 group-hover:pointer-events-auto group-hover:block">
              <div className="surface rounded-2xl p-2 shadow-[var(--shadow)]">
                {boards.map((board) => (
                  <Link
                    key={board.id}
                    href={`/boards/${board.slug}`}
                    className="block rounded-xl px-3 py-2 text-[var(--ink)] hover:bg-[rgba(31,95,139,0.08)]"
                  >
                    {board.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {user ? (
            <>
              <Link href="/my" className="hover:text-[var(--sky-deep)]">
                My Page
              </Link>
              {user.role === "admin" ? (
                <Link href="/admin" className="hover:text-[var(--sky-deep)]">
                  Admin
                </Link>
              ) : null}
            </>
          ) : null}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-[var(--muted)] sm:inline">{user.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="btn btn-secondary !min-h-10 !px-4 text-sm">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary !min-h-10 !px-4 text-sm">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary !min-h-10 !px-4 text-sm">
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="container flex gap-2 overflow-x-auto pb-3 lg:hidden">
        <Link href="/boards" className="badge whitespace-nowrap">
          All boards
        </Link>
        {boards.slice(0, 5).map((board) => (
          <Link key={board.id} href={`/boards/${board.slug}`} className="badge whitespace-nowrap">
            {board.name}
          </Link>
        ))}
        {user ? (
          <Link href="/my" className="badge whitespace-nowrap">
            My Page
          </Link>
        ) : null}
        {user?.role === "admin" ? (
          <Link href="/admin" className="badge whitespace-nowrap">
            Admin
          </Link>
        ) : null}
      </div>
    </header>
  );
}
