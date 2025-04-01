// src/client/layouts/AuthLayout.tsx
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/client/_auth/hooks/use-auth";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <p className="text-center">Loading session...</p>;

  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
