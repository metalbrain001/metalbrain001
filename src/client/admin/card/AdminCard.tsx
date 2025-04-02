import React from "react";
import { IAdmin } from "@/client/types";
import { Card, CardContent } from "@/components/ui/card";
import { useUserRole } from "@/client/admin/hooks/use-role";

interface Props {
  admin: IAdmin;
}

const AdminCard: React.FC<Props> = ({ admin }) => {
  const user = admin.users[0];
  const { role, loading } = useUserRole();
  const isAdmin = role === "ADMIN";

  return (
    <Card className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
      <CardContent className="col-span-1 sm:col-span-1 lg:col-span-1 p-4 text-white">
        <div className="flex items-center gap-4 mb-4">
          {user.photoUrl && (
            <img
              src={user.photoUrl}
              alt="Admin"
              className="w-16 h-16 rounded-full border"
            />
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">Role:</span>
              <span
                className={`text-sm font-semibold ${
                  isAdmin ? "text-green-400" : "text-red-400"
                }`}
              >
                {loading ? "Loading..." : isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <p className="font-medium">{user.displayName}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>
            <strong>UID:</strong> {user.localId}
          </li>
          <li>
            <strong>Provider:</strong> {user.providerUserInfo?.[0]?.providerId}
          </li>
          <li>
            <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
          </li>
          <li>
            <strong>Last Login:</strong> {user.lastLoginAt}
          </li>
          <li>
            <strong>Created At:</strong> {user.createdAt}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
