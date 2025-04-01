// // components/ui/Button.tsx
"use client";
import React from "react";
import clsx from "clsx";
import Inner from "../helper/Inner";

type ButtonVariants = "primary" | "secondary" | "outline" | "ghost";
type ButtonSizes = "sm" | "md" | "lg";

interface SharedProps {
  children: React.ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

type ButtonProps = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  iconLeft,
  iconRight,
  className = "",
  disabled,
  href,
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles: Record<ButtonVariants, string> = {
    primary: "bg-p4 text-white hover:bg-p4/90 focus:ring-p4",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-blue-800 focus:ring-gray-300",
  };

  const sizeStyles: Record<ButtonSizes, string> = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const buttonContent = (
    <Inner isLoading={isLoading} iconLeft={iconLeft} iconRight={iconRight}>
      {children}
    </Inner>
  );

  if (href) {
    return (
      <a
        href={href}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      disabled={isLoading || disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isLoading && "opacity-70 cursor-not-allowed",
        className,
      )}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
