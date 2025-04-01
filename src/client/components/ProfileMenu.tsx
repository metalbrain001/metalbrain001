// src/client/components/ProfileMenu.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/client/_auth/hooks/use-auth";
import { profileOptions } from "@/client/constants";
import Avatar from "@/client/components/Avatar";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/client/hooks/use-signout";
import { useNavigate } from "react-router-dom";
import logoutClientCleanup from "@/client/lib/logoutCleanup";

const ProfileMenu = () => {
  const { user, isAuthenticated } = useAuth();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    const sessionId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];

    if (!sessionId) {
      navigate("/login", { replace: true });
      return;
    }
    signOut.mutate(sessionId, {
      onSuccess: () => {
        logoutClientCleanup();
        navigate("/login", { replace: true });
        window.location.href = "/login"; // OR
        window.location.reload(); // ✅ triggers new AuthContext mount
        // ✅ clean reset
      },
    });
  };

  if (!isAuthenticated || !user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 hover:scale-105 transition"
        >
          <Avatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-gray-900 text-white border border-gray-700 shadow-xl z-50"
        align="end"
      >
        <DropdownMenuLabel className="text-sm text-gray-300">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {profileOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="hover:bg-gray-800 transition"
          >
            <Link to={option.path} className="w-full">
              {option.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          onClick={handleLogout}
          className="w-full text-left text-red-500 hover:bg-gray-800 px-2 py-1.5 text-sm"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
