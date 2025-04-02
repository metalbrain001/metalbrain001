"use client";

import React, { useEffect } from "react";
import FirebaseUserCard from "@/client/firebase/card/FirebaseUserCard";
import { useGetFirebaseUser } from "@/client/firebase/hooks/use-get-firebaseuser";

const FireBaseUser = () => {
  const { data: user, isLoading, isError, refetch } = useGetFirebaseUser();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <p className="text-gray-500">Loading user...</p>;
  if (isError || !user)
    return <p className="text-red-500">Failed to fetch Firebase user</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Firebase User Info</h1>
      <FirebaseUserCard
        uid={user.uid}
        email={user.email}
        role={user.role}
        name={user.name}
        provider={user.provider}
        emailVerified={user.emailVerified}
      />
    </div>
  );
};

export default FireBaseUser;
