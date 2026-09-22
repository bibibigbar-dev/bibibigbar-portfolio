"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import { slugify } from "@/lib/utils";

export async function createBoardAction(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugify(slugInput || name);

  if (!name || !slug) return;

  const store = await readStore();
  if (store.boards.some((board) => board.slug === slug)) return;

  const maxOrder = store.boards.reduce((max, board) => Math.max(max, board.order), 0);
  await updateStore((current) => ({
    ...current,
    boards: [
      ...current.boards,
      {
        id: `board-${randomUUID()}`,
        slug,
        name,
        description: description || "Community discussion board.",
        order: maxOrder + 1,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ],
  }));

  revalidatePath("/boards");
  revalidatePath("/admin/boards");
  revalidatePath("/");
}

export async function toggleBoardAction(formData: FormData) {
  await requireAdmin();
  const boardId = String(formData.get("boardId") || "");

  await updateStore((current) => ({
    ...current,
    boards: current.boards.map((board) =>
      board.id === boardId ? { ...board, isActive: !board.isActive } : board
    ),
  }));

  revalidatePath("/boards");
  revalidatePath("/admin/boards");
  revalidatePath("/");
}

export async function togglePostHiddenAction(formData: FormData) {
  await requireAdmin();
  const postId = String(formData.get("postId") || "");

  await updateStore((current) => ({
    ...current,
    posts: current.posts.map((post) =>
      post.id === postId ? { ...post, isHidden: !post.isHidden } : post
    ),
  }));

  revalidatePath("/admin/posts");
  revalidatePath("/boards");
}

export async function togglePostPinnedAction(formData: FormData) {
  await requireAdmin();
  const postId = String(formData.get("postId") || "");

  await updateStore((current) => ({
    ...current,
    posts: current.posts.map((post) =>
      post.id === postId ? { ...post, isPinned: !post.isPinned } : post
    ),
  }));

  revalidatePath("/admin/posts");
  revalidatePath("/boards");
}

export async function setUserRoleAction(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "");
  if (role !== "user" && role !== "admin") return;

  await updateStore((current) => ({
    ...current,
    users: current.users.map((user) =>
      user.id === userId ? { ...user, role } : user
    ),
  }));

  revalidatePath("/admin/users");
}
