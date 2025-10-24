import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import HeaderBar from "../HeaderBar";
const dash_links: {
  path: string;
  label: string;
  type: "menu" | "submenu";
  children?: {
    path: string;
    label: string;
  }[];
}[] = [
  {
    path: "/app",
    label: "Dashboard",
    type: "menu",
  },
  {
    path: "/app/users",
    label: "Users",
    type: "menu",
  },
  {
    path: "/app/food",
    label: "Food",
    type: "submenu",
    children: [
      { path: "/app/food", label: "Food List" },
      {
        path: "/app/food/category",
        label: "Food Category",
      },
      {
        path: "/app/food/addons",
        label: "Food Addons",
      },
    ],
  },
  {
    path: "/app/studio",
    label: "Studio",
    type: "submenu",
    children: [
      { path: "/app/studio", label: "Studio Bookings" },
      { path: "/app/studio/all", label: "All Studios" },
    ],
  },
  {
    path: "/app/hotel",
    label: "Hotel",
    type: "submenu",
    children: [
      { path: "/app/hotel", label: "All Hotels" },
      { path: "/app/hotel/amenity", label: "Hotel Amenity" },
    ],
  },
  {
    path: "/app/cinema",
    label: "Cinema",
    type: "submenu",
    children: [{ path: "/app/cinema", label: "All Cinemas" }],
  },
  {
    path: "/app/movie-cinema",
    label: "Movie Cinemas",
    type: "submenu",
    children: [{ path: "/app/movie-cinema", label: "All Movie Cinemas" }],
  },
];
export default function AppLayout(props: PropsWithChildren) {
  return (
    <div className="h-screen flex flex-col">
      <div className="drawer lg:drawer-open">
        <input id="app-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  ">
          {/*<div className="h-20 bg-base-300">s</div>*/}
          <HeaderBar />
          {/* Page content here */}
          {/*<label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
            Open drawer
          </label>*/}
          <main className="p-6 flex-1 bg-base-200 overflow-y-auto border-l border-t border-current/20">
            {props.children}
          </main>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="app-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-72 h-full flex flex-col bg-base-100 ">
            <div className="h-20  flex items-center px-8 shadow ">
              <img
                className="h-18 mx-auto"
                src="https://deependapp.com.ng/assets/images/deep.png"
                alt=""
              />
              {/*<div className="font-bold capitalize text-lg">
                Deepend <div>entertainment</div>
              </div>*/}
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="menu min-h-full space-y-2 w-72 p-4">
                {/* Sidebar content here */}
                {dash_links.map((link) =>
                  link.type === "menu" ? (
                    <li key={"nav" + link.path}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ) : (
                    <li key={"nav" + link.path}>
                      <details open>
                        <summary>{link.label}</summary>
                        <ul>
                          {link.children?.map((childLink) => (
                            <li key={"nav" + childLink.path}>
                              <Link to={childLink.path}>{childLink.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
