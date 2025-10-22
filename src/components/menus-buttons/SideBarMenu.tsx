import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SideBarMenu() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const menu = document.querySelector("#app-drawer") as HTMLInputElement;
    if (!menu) {
      console.warn("Element with ID 'app-drawer' not found.");
      return;
    }

    const handleClick = () => {
      setIsChecked((prev) => !prev);
    };

    menu.addEventListener("click", handleClick);

    return () => {
      menu.removeEventListener("click", handleClick);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div
      className="btn btn-ghost btn-square"
      onClick={() => {
        const menu = document.querySelector("#app-drawer") as HTMLInputElement;
        menu.click();
      }}
    >
      {!isChecked ? <MenuIcon /> : <XIcon />}
    </div>
  );
}
