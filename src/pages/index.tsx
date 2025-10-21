import Stats from "@/components/Stats";
import { redirect } from "@tanstack/react-router";
export const Loader = () => {
  console.log("route loader");
  return redirect({ to: "/app" });
};

export default function index() {
  return (
    <div className="">
      <Stats />
    </div>
  );
}
