"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import {
  clearSession,
  createSession,
  hashPassword,
  toSessionUser,
  verifyPassword,
} from "@/lib/auth";
import { updateStore, readStore } from "@/lib/store";

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || password.length < 6) {
    return { error: "Name, email, and a password of at least 6 characters are required." };
  }

  const store = await readStore();
  if (store.users.some((user) => user.email === email)) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const user = {
    id: `user-${randomUUID()}`,
    email,
    name,
    passwordHash,
    role: "user" as const,
    createdAt: new Date().toISOString(),
  };

  await updateStore((current) => ({
    ...current,
    users: [...current.users, user],
  }));

  await createSession(toSessionUser(user));
  redirect("/my");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const store = await readStore();
  const user = store.users.find((item) => item.email === email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  await createSession(toSessionUser(user));
  redirect(user.role === "admin" ? "/admin" : "/my");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
