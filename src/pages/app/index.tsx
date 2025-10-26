import Charts from "@/components/Charts";
import DashUserLists from "@/components/DashUserLists";
import Stats from "@/components/Stats";
import { Link } from "@tanstack/react-router";

export default function index() {
  return (
    <>
      <Stats />

      <Charts />
      <div className="p-4 my-8 space-y-4  rounded-md">
        <div className="flex ">
          <h2 className="text-xl font-bold">UserList</h2>
          <Link className="link ml-auto" to="/app/users">
            See All
          </Link>
        </div>
        <DashUserLists />
      </div>
    </>
  );
}
