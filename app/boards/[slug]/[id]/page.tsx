import Link from "next/link";
import { notFound } from "next/navigation";
import { createCommentAction, deletePostAction } from "@/lib/actions/posts";
import {
  getCommentsByPost,
  getCurrentUser,
  getPostById,
} from "@/lib/queries";
import { formatDateTime } from "@/lib/utils";

interface PostDetailPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostById(id);
  return { title: post?.title || "Post" };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug, id } = await params;
  const [post, comments, user] = await Promise.all([
    getPostById(id),
    getCommentsByPost(id),
    getCurrentUser(),
  ]);

  if (!post || post.board.slug !== slug) notFound();
  if (post.isHidden && user?.role !== "admin" && user?.id !== post.authorId) {
    notFound();
  }

  const canManage = Boolean(user && (user.id === post.authorId || user.role === "admin"));

  return (
    <div className="container py-12">
      <Link href={`/boards/${slug}`} className="text-sm font-semibold text-[var(--sky-mid)]">
        ← Back to {post.board.name}
      </Link>

      <article className="surface mt-6 rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {post.isPinned ? <span className="badge">Pinned</span> : null}
          {post.isHidden ? <span className="badge">Hidden</span> : null}
          <span>{formatDateTime(post.createdAt)}</span>
          <span>·</span>
          <span>{post.author.name}</span>
        </div>
        <h1 className="display mt-4 text-4xl font-bold text-[var(--sky-deep)]">{post.title}</h1>
        <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-[var(--ink)]">
          {post.content}
        </div>

        {canManage ? (
          <div className="mt-8 flex flex-wrap gap-2">
            <Link href={`/boards/${slug}/${id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <form action={deletePostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </form>
          </div>
        ) : null}
      </article>

      <section className="mt-10">
        <h2 className="display text-2xl font-bold text-[var(--sky-deep)]">
          Comments ({comments.length})
        </h2>
        <div className="mt-4 grid gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="surface rounded-2xl p-4">
              <div className="text-xs font-semibold text-[var(--muted)]">
                {comment.author.name} · {formatDateTime(comment.createdAt)}
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{comment.content}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form action={createCommentAction} className="surface mt-6 grid gap-3 rounded-[1.75rem] p-5">
            <input type="hidden" name="postId" value={post.id} />
            <label className="field">
              <span>Add a comment</span>
              <textarea name="content" required placeholder="Share a helpful reply…" />
            </label>
            <button type="submit" className="btn btn-primary w-fit">
              Post comment
            </button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-[var(--muted)]">
            <Link href="/login" className="font-semibold text-[var(--sky-mid)]">
              Log in
            </Link>{" "}
            to leave a comment.
          </p>
        )}
      </section>
    </div>
  );
}
