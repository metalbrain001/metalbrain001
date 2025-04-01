import React from "react";
import {
  X,
  Menu,
  LaptopMinimal,
  User,
  Folders,
  Workflow,
  View,
  Settings,
  HelpCircle,
  LucideMailbox,
} from "lucide-react";
import { JSX } from "react";

interface IconProps {
  name: string;
  size: number;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
  fill?: string;
  className?: string;
}

// Default values for the Icon component
const defaultProps = {
  size: 24,
  color: "currentColor",
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  fill: "none",
  className: "",
};

// Type checking for the Icon component
type IconComponents = {
  [key: string]: (props?: IconProps) => JSX.Element;
};

// Hook to manage icons dynamically
const Icons = (): IconComponents => {
  return {
    X: (props) => <X {...defaultProps} {...props} />,
    Menu: (props) => <Menu {...defaultProps} {...props} />,
    LaptopMinimal: (props) => <LaptopMinimal {...defaultProps} {...props} />,
    User: (props) => <User {...defaultProps} {...props} />,
    Folders: (props) => <Folders {...defaultProps} {...props} />,
    Workflow: (props) => <Workflow {...defaultProps} {...props} />,
    View: (props) => <View {...defaultProps} {...props} />,
    Settings: (props) => <Settings {...defaultProps} {...props} />,
    HelpCircle: (props) => <HelpCircle {...defaultProps} {...props} />,
    LucideMailbox: (props) => <LucideMailbox {...defaultProps} {...props} />,
  };
};

export default Icons;
