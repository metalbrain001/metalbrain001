// src/client/_auth/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@/client/_auth/context/authcontext";

export const useAuth = () => useContext(AuthContext);
