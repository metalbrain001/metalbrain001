"use client";
import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 1024): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
};
