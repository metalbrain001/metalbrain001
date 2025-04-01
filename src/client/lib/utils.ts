// src/client/utils/getInitials.ts
export const getInitials = (name: string | null | undefined) => {
  if (!name) return "MB"; // fallback initials for MetalBrain
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
};

export const getFormattedDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default {
  getInitials,
  getFormattedDate,
};
