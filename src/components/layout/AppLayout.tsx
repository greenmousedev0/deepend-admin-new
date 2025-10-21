import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import HeaderBar from "../HeaderBar";
const dash_links: { path: string; label: string }[] = [
  {
    path: "/app",
    label: "Dashboard",
  },
  {
    path: "/app/users",
    label: "Users",
  },
  { path: "/app/food", label: "Food" },
];
export default function AppLayout(props: PropsWithChildren) {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-screen flex flex-col">
          {/*<div className="h-20 bg-base-300">s</div>*/}
          <HeaderBar />
          {/* Page content here */}
          {/*<label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
            Open drawer
          </label>*/}
          <main className="p-6 flex-1 bg-base-200">{props.children}</main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-80 flex-1 h-screen  flex flex-col">
            <div className="h-20  grid place-items-center shadow ">
              <div>
                Deepend <div>entertainment</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="menu  min-h-full space-y-2 w-80 p-4">
                {/* Sidebar content here */}
                {dash_links.map((link) => (
                  <li key={"nav" + link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
