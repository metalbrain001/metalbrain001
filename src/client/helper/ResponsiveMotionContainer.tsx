"use client";
import React, { JSX } from "react";
import { motion, MotionProps } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

interface ResponsiveMotionContainerProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  mobileOnly?: boolean; // optional override
  as?: keyof JSX.IntrinsicElements; // div, section, etc.
}

const ResponsiveMotionContainer = ({
  children,
  className,
  mobileOnly = true,
  variants,
  initial,
  animate,
  exit,
  as: Tag = "div",
  ...rest
}: ResponsiveMotionContainerProps) => {
  const isMobile = useIsMobile();

  if (mobileOnly && !isMobile) {
    // Don't animate on desktop
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveMotionContainer;
