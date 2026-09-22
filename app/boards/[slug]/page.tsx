import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/components/post-list";
import { getBoardBySlug, getCurrentUser, getPostsByBoard } from "@/lib/queries";

interface BoardPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BoardPageProps) {
  const { slug } = await params;
  const board = await getBoardBySlug(slug);
  return { title: board?.name || "Board" };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { slug } = await params;
  const board = await getBoardBySlug(slug);
  if (!board || !board.isActive) notFound();

  const [posts, user] = await Promise.all([
    getPostsByBoard(board.id),
    getCurrentUser(),
  ]);

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sunset)]">
            Board
          </p>
          <h1 className="display mt-2 text-4xl font-bold text-[var(--sky-deep)]">{board.name}</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">{board.description}</p>
        </div>
        {user ? (
          <Link href={`/boards/${board.slug}/new`} className="btn btn-primary">
            Write a post
          </Link>
        ) : (
          <Link href="/login" className="btn btn-secondary">
            Log in to write
          </Link>
        )}
      </div>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
