// src/client/_auth/context/authContext.tsx

import React, { createContext, useContext } from "react";
import { useGetUserSession } from "@/client/hooks/use-getSession";
import { IUser } from "@/client/types";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
  sessionId: string;
}

export const AuthProvider = ({ children, sessionId }: AuthProviderProps) => {
  const { data: user, isLoading } = useGetUserSession(sessionId);

  const contextValue: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
