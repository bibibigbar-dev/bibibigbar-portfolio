import Link from "next/link";
import { PostList } from "@/components/post-list";
import { getActiveBoards, getCurrentUser, getRecentPosts } from "@/lib/queries";

export default async function HomePage() {
  const [boards, posts, user] = await Promise.all([
    getActiveBoards(),
    getRecentPosts(5),
    getCurrentUser(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(11,42,67,0.72), rgba(224,122,61,0.35)), url('https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container flex min-h-[78vh] flex-col justify-end pb-16 pt-24 text-white">
          <p className="animate-rise text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.78)]">
            DFW community hub
          </p>
          <h1 className="display animate-rise mt-4 max-w-4xl text-5xl font-bold leading-[1.05] sm:text-7xl">
            Living in Dallas
          </h1>
          <p
            className="animate-rise mt-5 max-w-xl text-lg leading-8 text-[rgba(255,255,255,0.88)]"
            style={{ animationDelay: "120ms" }}
          >
            Tips, housing, food, jobs, and neighbor talk for people building a life in the Dallas–Fort Worth metroplex.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
            <Link href="/boards" className="btn btn-ghost bg-white/15">
              Browse boards
            </Link>
            {user ? (
              <Link href="/my" className="btn btn-primary bg-[var(--sunset)] hover:bg-[#c9682f]">
                Write a post
              </Link>
            ) : (
              <Link href="/register" className="btn btn-primary bg-[var(--sunset)] hover:bg-[#c9682f]">
                Join the community
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl font-bold text-[var(--sky-deep)]">Topic boards</h2>
            <p className="mt-2 text-[var(--muted)]">Pick a board and share what you know.</p>
          </div>
          <Link href="/boards" className="btn btn-secondary">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board, index) => (
            <Link
              key={board.id}
              href={`/boards/${board.slug}`}
              className="surface animate-rise rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sunset)]">
                Board
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[var(--sky-deep)]">{board.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{board.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="mb-8">
          <h2 className="display text-3xl font-bold text-[var(--sky-deep)]">Latest from neighbors</h2>
          <p className="mt-2 text-[var(--muted)]">Fresh posts across every board.</p>
        </div>
        <PostList posts={posts} showBoard />
      </section>
    </>
  );
}
