import { getSessionUser } from "@/lib/auth";
import { readStore } from "@/lib/store";
import type { Board, Comment, Post, SessionUser, User } from "@/lib/types";

export interface PostWithMeta extends Post {
  board: Board;
  author: Pick<User, "id" | "name" | "email">;
  commentCount: number;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  return getSessionUser();
}

export async function getActiveBoards() {
  const store = await readStore();
  return store.boards
    .filter((board) => board.isActive)
    .sort((a, b) => a.order - b.order);
}

export async function getAllBoards() {
  const store = await readStore();
  return [...store.boards].sort((a, b) => a.order - b.order);
}

export async function getBoardBySlug(slug: string) {
  const store = await readStore();
  return store.boards.find((board) => board.slug === slug) || null;
}

function mapPost(
  post: Post,
  store: Awaited<ReturnType<typeof readStore>>
): PostWithMeta | null {
  const board = store.boards.find((item) => item.id === post.boardId);
  const author = store.users.find((item) => item.id === post.authorId);
  if (!board || !author) return null;

  return {
    ...post,
    board,
    author: { id: author.id, name: author.name, email: author.email },
    commentCount: store.comments.filter((item) => item.postId === post.id).length,
  };
}

export async function getRecentPosts(limit = 6) {
  const store = await readStore();
  return store.posts
    .filter((post) => !post.isHidden)
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    })
    .map((post) => mapPost(post, store))
    .filter((post): post is PostWithMeta => Boolean(post))
    .slice(0, limit);
}

export async function getPostsByBoard(boardId: string, includeHidden = false) {
  const store = await readStore();
  return store.posts
    .filter((post) => post.boardId === boardId && (includeHidden || !post.isHidden))
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    })
    .map((post) => mapPost(post, store))
    .filter((post): post is PostWithMeta => Boolean(post));
}

export async function getPostById(postId: string) {
  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;
  return mapPost(post, store);
}

export async function getCommentsByPost(postId: string) {
  const store = await readStore();
  return store.comments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((comment) => {
      const author = store.users.find((user) => user.id === comment.authorId);
      return {
        ...comment,
        author: author
          ? { id: author.id, name: author.name }
          : { id: "unknown", name: "Unknown" },
      };
    });
}

export async function getPostsByAuthor(authorId: string) {
  const store = await readStore();
  return store.posts
    .filter((post) => post.authorId === authorId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((post) => mapPost(post, store))
    .filter((post): post is PostWithMeta => Boolean(post));
}

export async function getAdminStats() {
  const store = await readStore();
  return {
    users: store.users.length,
    boards: store.boards.length,
    posts: store.posts.length,
    comments: store.comments.length,
    hiddenPosts: store.posts.filter((post) => post.isHidden).length,
  };
}

export async function getAllPostsForAdmin() {
  const store = await readStore();
  return store.posts
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((post) => mapPost(post, store))
    .filter((post): post is PostWithMeta => Boolean(post));
}

export async function getAllUsersForAdmin() {
  const store = await readStore();
  return [...store.users]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    }));
}

export type CommentWithAuthor = Comment & {
  author: { id: string; name: string };
};
