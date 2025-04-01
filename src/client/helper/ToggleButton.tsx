import React, { useState } from "react";
import Icons from "../components/UseIcons";
import { ToggleButtonProps } from "../types";

const Toggle: React.FC<ToggleButtonProps> = ({
  isOpen: externalIsOpen,
  onToggle,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalIsOpen ?? internalOpen;

  const { X, Menu } = Icons();

  const handleClick = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalOpen(newState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`lg:hidden z-20 size-20 border-2 border-s4/25 rounded-full flex items-center justify-center p-2 transition-all ${className || "object-contain"}`}
    >
      {isOpen ? (
        <X
          size={24}
          strokeWidth={2}
          color="pink"
          absoluteStrokeWidth={false}
          name={``}
        />
      ) : (
        <Menu
          size={24}
          strokeWidth={2}
          color="pink"
          absoluteStrokeWidth={false}
          name={``}
        />
      )}
    </button>
  );
};

export default Toggle;
