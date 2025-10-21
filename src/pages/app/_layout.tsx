import AppLayout from "@/components/layout/AppLayout";
import { get_user_value } from "@/store/authStore";
import { Outlet } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Loader = () => {
  const user = get_user_value();
  if (!user) return redirect({ to: "/auth/login" });
  return;
};
export default function index() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
