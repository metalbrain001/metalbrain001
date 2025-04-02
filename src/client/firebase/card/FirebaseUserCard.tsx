// firebase/card/FirebaseUserCard.tsx
"use client";
import React, { useEffect } from "react";

interface FirebaseUserCardProps {
  uid: string;
  email: string;
  name?: string | null;
  provider: string;
  emailVerified: boolean;
  role?: string;
}

const FirebaseUserCard: React.FC<FirebaseUserCardProps> = ({
  uid,
  email,
  role = "USER",
  name,
  provider,
  emailVerified,
}) => {
  return (
    <div className="shadow-md rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold mb-2">🔥 Firebase User Info</h2>
      <p>
        <strong>UID:</strong> {uid}
      </p>
      <p>
        <strong>Name:</strong> {name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Provider:</strong> {provider}
      </p>
      <p>
        <strong>Email Verified:</strong> {emailVerified ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
    </div>
  );
};

export default FirebaseUserCard;
