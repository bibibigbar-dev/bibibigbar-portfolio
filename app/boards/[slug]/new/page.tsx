import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/post-form";
import { createPostAction } from "@/lib/actions/posts";
import { getBoardBySlug, getCurrentUser } from "@/lib/queries";

interface NewPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewPostPage({ params }: NewPostPageProps) {
  const { slug } = await params;
  const [board, user] = await Promise.all([getBoardBySlug(slug), getCurrentUser()]);
  if (!board || !board.isActive) notFound();
  if (!user) redirect(`/login?next=/boards/${slug}/new`);

  return (
    <PostForm
      action={createPostAction}
      boardSlug={board.slug}
      heading={`Write in ${board.name}`}
      submitLabel="Publish post"
    />
  );
}
