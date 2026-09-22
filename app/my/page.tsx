import Link from "next/link";
import { redirect } from "next/navigation";
import { PostList } from "@/components/post-list";
import { getActiveBoards, getCurrentUser, getPostsByAuthor } from "@/lib/queries";

export const metadata = { title: "My Page" };

export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/my");

  const [posts, boards] = await Promise.all([
    getPostsByAuthor(user.id),
    getActiveBoards(),
  ]);

  return (
    <div className="container py-12">
      <div className="surface rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sunset)]">
          User workspace
        </p>
        <h1 className="display mt-2 text-4xl font-bold text-[var(--sky-deep)]">Hi, {user.name}</h1>
        <p className="mt-3 text-[var(--muted)]">
          Write posts, manage your own content, and keep track of what you have shared with neighbors.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {boards.slice(0, 4).map((board) => (
            <Link key={board.id} href={`/boards/${board.slug}/new`} className="btn btn-secondary">
              Write in {board.name}
            </Link>
          ))}
          {user.role === "admin" ? (
            <Link href="/admin" className="btn btn-primary">
              Open admin
            </Link>
          ) : null}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl font-bold text-[var(--sky-deep)]">My posts</h2>
        <div className="mt-4">
          <PostList posts={posts} emptyMessage="You have not written any posts yet." showBoard />
        </div>
      </section>
    </div>
  );
}
