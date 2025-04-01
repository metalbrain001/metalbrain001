// src/client/_root/components/TopBar.tsx
import { NavLink } from "react-router-dom";
import { getFormattedDate } from "@/client/lib/utils";
import { useAuth } from "@/client/_auth/hooks/use-auth";
import Avatar from "@/client/components/Avatar";
import { TopBarNavLinks } from "@/client/constants";
import ProfileMenu from "@/client/components/ProfileMenu";

const TopBar = () => {
  const { user } = useAuth();
  const currentDate = getFormattedDate();

  return (
    <header className="w-full bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Left: Nav Links */}
      <nav className="flex items-center gap-6">
        {TopBarNavLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      {/*/!* Right: User Info + Avatar *!/*/}
      {/*<div className="flex items-center gap-4">*/}
      {/*  <div className="text-sm text-right">*/}
      {/*    <p className="text-gray-300 font-semibold">{user?.name || "User"}</p>*/}
      {/*    <p className="text-xs text-gray-400">{user?.role || "USER"}</p>*/}
      {/*    <p className="text-xs text-gray-500">{currentDate}</p>*/}
      {/*  </div>*/}
      {/*  <Avatar />*/}
      {/*</div>*/}
      <ProfileMenu />
    </header>
  );
};

export default TopBar;
