"use client";

import React, { useEffect } from "react";
import { useGetAdmin } from "@/client/admin/hooks/use-getadmin"; // Your query hook
import AdminCard from "@/client/admin/card/AdminCard";

interface AdminProps {
  localId: string;
}

const Admin: React.FC<AdminProps> = ({ localId }) => {
  const { data, isLoading, isError, refetch } = useGetAdmin(localId);

  useEffect(() => {
    if (localId) refetch();
  }, [localId]);

  if (isLoading) return <p>Loading admin info...</p>;
  if (isError || !data) return <p>Failed to load admin data</p>;

  return (
    <div className="col-span-1 sm:col-span-1 lg:col-span-1">
      <AdminCard admin={data} />
    </div>
  );
};

export default Admin;
