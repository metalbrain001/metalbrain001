// src/client/_auth/context/authContext.tsx

import React, { createContext, useContext, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { useGetUserSession } from "@/client/hooks/use-getSession";
import { IUser } from "@/client/types";

interface AuthContextType {
  user: IUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
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
  const { data: user, isLoading: loadingSession } =
    useGetUserSession(sessionId);
  const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(
    null,
  );
  const [firebaseLoading, setFirebaseLoading] = React.useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setFirebaseLoading(false);
    });

    return () => unsubscribe();
  });

  const contextValue: AuthContextType = {
    user: user || null,
    firebaseUser,
    isLoading: loadingSession || firebaseLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
