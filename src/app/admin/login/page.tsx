import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/auth";

export const metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="section-pad mx-auto max-w-xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        Admin
      </p>
      <h1 className="mt-2 font-display text-5xl text-ice">Sign in</h1>
      <p className="mt-3 text-sm text-ice/50">
        Review applications and subscriber stats.
      </p>
      <AdminLoginForm />
    </div>
  );
}
