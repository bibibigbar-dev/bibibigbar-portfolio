"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";

export async function createPostAction(formData: FormData) {
  const user = await requireUser();
  const boardSlug = String(formData.get("boardSlug") || "");
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title || !content) return;

  const store = await readStore();
  const board = store.boards.find((item) => item.slug === boardSlug && item.isActive);
  if (!board) return;

  const now = new Date().toISOString();
  const post = {
    id: `post-${randomUUID()}`,
    boardId: board.id,
    authorId: user.id,
    title,
    content,
    createdAt: now,
    updatedAt: now,
    isPinned: false,
    isHidden: false,
  };

  await updateStore((current) => ({
    ...current,
    posts: [post, ...current.posts],
  }));

  revalidatePath(`/boards/${boardSlug}`);
  revalidatePath("/");
  redirect(`/boards/${boardSlug}/${post.id}`);
}

export async function updatePostAction(formData: FormData) {
  const user = await requireUser();
  const postId = String(formData.get("postId") || "");
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title || !content) return;

  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return;
  if (post.authorId !== user.id && user.role !== "admin") return;

  const board = store.boards.find((item) => item.id === post.boardId);
  await updateStore((current) => ({
    ...current,
    posts: current.posts.map((item) =>
      item.id === postId
        ? { ...item, title, content, updatedAt: new Date().toISOString() }
        : item
    ),
  }));

  revalidatePath(`/boards/${board?.slug}`);
  revalidatePath(`/boards/${board?.slug}/${postId}`);
  redirect(`/boards/${board?.slug}/${postId}`);
}

export async function deletePostAction(formData: FormData) {
  const user = await requireUser();
  const postId = String(formData.get("postId") || "");
  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return;
  if (post.authorId !== user.id && user.role !== "admin") return;

  const board = store.boards.find((item) => item.id === post.boardId);
  await updateStore((current) => ({
    ...current,
    posts: current.posts.filter((item) => item.id !== postId),
    comments: current.comments.filter((item) => item.postId !== postId),
  }));

  revalidatePath(`/boards/${board?.slug}`);
  revalidatePath("/admin");
  revalidatePath("/my");
  redirect(user.role === "admin" ? "/admin/posts" : "/my");
}

export async function createCommentAction(formData: FormData) {
  const user = await requireUser();
  const postId = String(formData.get("postId") || "");
  const content = String(formData.get("content") || "").trim();
  if (!content) return;

  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId && !item.isHidden);
  if (!post) return;
  const board = store.boards.find((item) => item.id === post.boardId);

  await updateStore((current) => ({
    ...current,
    comments: [
      {
        id: `comment-${randomUUID()}`,
        postId,
        authorId: user.id,
        content,
        createdAt: new Date().toISOString(),
      },
      ...current.comments,
    ],
  }));

  revalidatePath(`/boards/${board?.slug}/${postId}`);
}
