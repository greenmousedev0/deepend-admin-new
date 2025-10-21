import Stats from "@/components/Stats";
import { redirect } from "@tanstack/react-router";
export const Loader = () => {
  console.log("route loaderr");
  return redirect({ to: "/app" });
};

export default function index() {
  return (
    <div className="">
      <Stats />
    </div>
  );
}
