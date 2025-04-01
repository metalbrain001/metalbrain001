import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/client/_auth/hooks/use-auth";
import { useEffect } from "react";
import TopBar from "@/client/components/TopBar";
import SideBar from "@/client/components/SideBar";

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p className="text-center">Loading session...</p>;

  if (!isAuthenticated) return <p className="text-center">Unauthorized</p>;

  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-950 text-white">
        <SideBar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
