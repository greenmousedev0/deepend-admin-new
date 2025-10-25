import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import HeaderBar from "../HeaderBar";
import {
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  Utensils,
  MonitorPlay,
  Hotel,
  Film,
  Gamepad2,
  ToolCase,
  Pizza,
  List,
  PlusCircle,
  Building,
  Ticket,
  Clapperboard,
  Tv,
} from "lucide-react";
import { useLogout } from "@/helpers/auth";
const dash_links: {
  path: string;
  label: string;
  type: "menu" | "submenu";
  icon: React.ElementType;
  children?: {
    path: string;
    label: string;
    icon: React.ElementType;
  }[];
}[] = [
  {
    path: "/app",
    label: "Dashboard",
    type: "menu",
    icon: LayoutDashboard,
  },
  {
    path: "/app/users",
    label: "Users",
    type: "menu",
    icon: Users,
  },
  {
    path: "/app/food",
    label: "Food",
    type: "submenu",
    icon: Utensils,
    children: [
      { path: "/app/food", label: "Food List", icon: List },
      {
        path: "/app/food/category",
        label: "Food Category",
        icon: Pizza,
      },
      {
        path: "/app/food/addons",
        label: "Food Addons",
        icon: PlusCircle,
      },
    ],
  },
  {
    path: "/app/studio",
    label: "Studio",
    type: "submenu",
    icon: MonitorPlay,
    children: [
      { path: "/app/studio", label: "Studio Bookings", icon: Ticket },
      { path: "/app/studio/all", label: "All Studios", icon: Building },
    ],
  },
  {
    path: "/app/hotel",
    label: "Hotel",
    type: "submenu",
    icon: Hotel,
    children: [
      { path: "/app/hotel", label: "All Hotels", icon: Building },
      { path: "/app/hotel/amenity", label: "Hotel Amenity", icon: Tv },
    ],
  },
  {
    path: "/app/cinema",
    label: "Cinema",
    type: "submenu",
    icon: Film,
    children: [
      { path: "/app/cinema", label: "All Cinemas", icon: Clapperboard },
      { path: "/app/cinema/halls", label: "All Halls", icon: Building },
      { path: "/app/cinema/movies", label: "All Movies", icon: Film },
    ],
  },
  {
    path: "/app/vr",
    label: "VR Games Ticket",
    children: [],
    type: "menu",
    icon: Gamepad2,
  },
  {
    path: "/app/equipment",
    label: "Equipment Renting",
    children: [],
    type: "menu",
    icon: ToolCase,
  },
  // {
  //   path: "/app/movie-cinema",
  //   label: "Movie Cinemas",
  //   type: "submenu",
  //   children: [{ path: "/app/movie-cinema", label: "All Movie Cinemas" }],
  // },
];
export default function AppLayout(props: PropsWithChildren) {
  const { logout } = useLogout();
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
          <div className="w-72 h-full  overflow-y-scroll  bg-base-100 ">
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
            <div className="flex-1 flex    overflow-y-auto">
              <ul className="menu  min-h-full space-y-2 w-72 p-4">
                {/* Sidebar content here */}
                {dash_links.map((link) =>
                  link.type === "menu" ? (
                    <li key={"nav" + link.path}>
                      <Link to={link.path}>
                        <link.icon size="18px" /> {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={"nav" + link.path}>
                      <details>
                        <summary>
                          <link.icon size="18px" /> {link.label}
                        </summary>
                        <ul>
                          {link.children?.map((childLink) => (
                            <li key={"nav" + childLink.path}>
                              <Link to={childLink.path}>
                                <childLink.icon size="18px" /> {childLink.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ),
                )}
                <li className="mt-auto">
                  <a>
                    {" "}
                    <Settings size="18px" /> Settings
                  </a>
                </li>
                <li className="">
                  <a onClick={() => logout()}>
                    <LogOut size="18px" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
