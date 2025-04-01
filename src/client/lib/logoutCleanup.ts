import axiosInstance from "@/client/api/axios";

export const logoutClientCleanup = () => {
  // Clear cookies
  document.cookie =
    "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear sessionStorage
  sessionStorage.removeItem("sessionId");
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("accessToken");

  // Reset axios headers
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default logoutClientCleanup;
