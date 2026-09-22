import Link from "next/link";
import { excerpt, formatDate } from "@/lib/utils";
import type { PostWithMeta } from "@/lib/queries";

interface PostListProps {
  posts: PostWithMeta[];
  emptyMessage?: string;
  showBoard?: boolean;
}

export function PostList({
  posts,
  emptyMessage = "No posts yet. Be the first to write.",
  showBoard = false,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="surface rounded-3xl px-6 py-10 text-center text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/boards/${post.board.slug}/${post.id}`}
          className="surface animate-rise rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)]">
            {post.isPinned ? <span className="badge">Pinned</span> : null}
            {post.isHidden ? <span className="badge">Hidden</span> : null}
            {showBoard ? <span className="badge">{post.board.name}</span> : null}
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.commentCount} comments</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-[var(--sky-deep)]">{post.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{excerpt(post.content)}</p>
        </Link>
      ))}
    </div>
  );
}
