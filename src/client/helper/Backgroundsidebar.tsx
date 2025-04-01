"use client";
import React from "react";
import clsx from "clsx";

interface BackgroundSidebarProps {
  className?: string;
  backdropImageUrl?: string;
  backdropPosition?: "left" | "right" | "center" | "top" | "bottom";
  backdropSize?: string;
  backdropOpacity?: number; // 0 to 1
}

const BackgroundSidebar: React.FC<BackgroundSidebarProps> = ({
  className = "",
  backdropImageUrl = "/assets/images/sidebar.svg",
  backdropPosition = "center",
  backdropSize = "cover",
  backdropOpacity = 0.1,
}) => {
  return (
    <div
      className={clsx(
        "lg:hidden block absolute top-80 left-0 w-[1000px] h-[380px] translate-x-[-5px] -translate-y-1/2 pointer-events-none",
        className,
      )}
      style={{
        backgroundImage: `url(${backdropImageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: backdropPosition,
        backgroundSize: backdropSize,
        opacity: backdropOpacity,
        width: "100%",
        height: "60%",
      }}
      aria-hidden="true"
    />
  );
};

export default BackgroundSidebar;
