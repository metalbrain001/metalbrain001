// src/Routes.tsx
import { Routes, Route } from "react-router-dom";
import LandingLayout from "@/client/Layout/LandingLayout";
import SignIn from "./client/_auth/form/SignIn";
import SignUp from "./client/_auth/form/SignUp";
import Dashboard from "@/client/_root/pages/Dashboard";
import RootLayout from "@/client/_root/RootLayout";
import AuthLayout from "./client/_auth/AuthLayout";
import Home from "@/client/Layout/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap all landing pages inside LandingLayout */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* AuthLayout wraps login/signup */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      {/* Dashboard / Protected routes */}
      <Route path="/dashboard" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        {/* You can add nested dashboard routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
