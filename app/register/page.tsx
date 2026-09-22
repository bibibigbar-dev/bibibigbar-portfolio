import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { registerAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/queries";

export const metadata = { title: "Join" };

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/my");

  return (
    <>
      <AuthForm
        action={registerAction}
        title="Join Living in Dallas"
        subtitle="Create an account to post tips, questions, and local finds."
        submitLabel="Create account"
        includeName
      />
      <p className="pb-12 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--sky-mid)]">
          Log in
        </Link>
      </p>
    </>
  );
}
