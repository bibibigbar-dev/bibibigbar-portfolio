import { notFound, redirect } from "next/navigation";
import { PostForm } from "@/components/post-form";
import { updatePostAction } from "@/lib/actions/posts";
import { getCurrentUser, getPostById } from "@/lib/queries";

interface EditPostPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug, id } = await params;
  const [post, user] = await Promise.all([getPostById(id), getCurrentUser()]);
  if (!post || post.board.slug !== slug) notFound();
  if (!user) redirect(`/login?next=/boards/${slug}/${id}/edit`);
  if (user.id !== post.authorId && user.role !== "admin") redirect(`/boards/${slug}/${id}`);

  return (
    <PostForm
      action={updatePostAction}
      boardSlug={slug}
      postId={post.id}
      title={post.title}
      content={post.content}
      heading="Edit post"
      submitLabel="Save changes"
    />
  );
}
