// components/ui/Inner.tsx
import React from "react";

interface InnerButtonProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Inner: React.FC<InnerButtonProps> = ({
  iconLeft,
  iconRight,
  isLoading = false,
  children,
}) => {
  if (isLoading) {
    return <span className="animate-pulse">Loading...</span>;
  }

  return (
    <>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </>
  );
};

export default Inner;
