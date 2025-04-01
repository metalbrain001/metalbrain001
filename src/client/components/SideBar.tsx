// src/client/_root/components/Sidebar.tsx
"use client";
import { NavLink } from "react-router-dom";
import { sideBarNavLinks } from "@/client/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMotion from "@/client/hooks/use-motion";
import { useAuth } from "@/client/_auth/hooks/use-auth";
import EmailModal from "@/client/modal/EmailModal";

const Sidebar = () => {
  const {
    motion,
    containerControls,
    containerVariants,
    isOpen,
    toggleDropdown,
    svgVariants,
    svgControls,
  } = useMotion();
  const { user } = useAuth();

  return (
    <motion.aside
      className="bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col justify-between"
      animate={containerControls}
      variants={containerVariants}
      initial="open"
    >
      {/* Logo / Title */}
      <div>
        <h2 className="text-xl text-white font-bold mb-3">
          {isOpen ? "MetalBrain" : "MB"}
        </h2>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          {sideBarNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {/* Icon */}
              {link.icon && <link.icon size={18} className="shrink-0" />}
              <span className="truncate">
                {isOpen ? link.label : link.label.charAt(0)}
              </span>
            </NavLink>
          ))}
        </nav>
        {/* SUPERADMIN EMAIL MODAL TRIGGER BUTTON */}
        {user?.role === "SUPERADMIN" && <EmailModal />}
      </div>

      {/* Toggle Button */}
      <div className="mt-10 flex justify-center">
        <motion.button
          onClick={toggleDropdown}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
          animate={svgControls}
          variants={svgVariants}
        >
          {isOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
