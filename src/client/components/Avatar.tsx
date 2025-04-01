// src/client/components/Avatar.tsx
import { getInitials } from "@/client/lib/utils";
import { useAuth } from "@/client/_auth/hooks/use-auth";

const Avatar = () => {
  const { user } = useAuth();

  const initials = getInitials(user?.name);
  const bgColors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-pink-600",
  ];
  const randomBg =
    bgColors[(user?.email?.charCodeAt(0) || 0) % bgColors.length];

  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold py-6 ${randomBg}`}
      title={user?.name || "MetalBrain User"}
    >
      {initials}
    </div>
  );
};

export default Avatar;
