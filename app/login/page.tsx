import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { loginAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/queries";

export const metadata = { title: "Log in" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === "admin" ? "/admin" : "/my");

  return (
    <>
      <AuthForm
        action={loginAction}
        title="Welcome back"
        subtitle="Log in to write posts and join the Dallas conversation."
        submitLabel="Log in"
      />
      <p className="pb-12 text-center text-sm text-[var(--muted)]">
        Demo accounts: admin@dallas.local / admin1234 · user@dallas.local / user1234
      </p>
      <p className="-mt-8 pb-12 text-center text-sm text-[var(--muted)]">
        No account yet?{" "}
        <Link href="/register" className="font-semibold text-[var(--sky-mid)]">
          Join here
        </Link>
      </p>
    </>
  );
}
