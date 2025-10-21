import { useAuth } from "@/store/authStore";
import { Bell, LogOut, Settings, User as UserIcon } from "lucide-react";

export default function HeaderBar() {
  const [user, setUser] = useAuth();
  return (
    <div className="h-20 p-6 flex justify-end items-center bg-base-100 shadow-md">
      <div className="flex items-center space-x-4">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={24} />
            {/*<span className="badge badge-xs badge-primary indicator-item"></span>*/}
          </div>
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content space-y-4 py-4 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                <UserIcon size={18} />
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>
                <Settings size={18} />
                Settings
              </a>
            </li>
            <li>
              <a onClick={() => setUser(null)}>
                <LogOut size={18} />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
