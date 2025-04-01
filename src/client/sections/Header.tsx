import React, { useState } from "react";
import NavLink from "../helper/LinkScroll";
import { Link as LinkScroll } from "react-scroll";
import Toggle from "../helper/ToggleButton";
import clsx from "clsx";
import useMotion from "../hooks/use-motion";
import BackgroundSidebar from "../helper/Backgroundsidebar";
import ResponsiveMotionContainer from "../helper/ResponsiveMotionContainer";

const Header = () => {
  const { animations } = useMotion();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="top-header">
      <div className="container flex items-center max-lg:px-5">
        <a className="lg-hidden flex-1 cursor-pointer z-2" href="/">
          <img
            src={`/assets/icons/logo.svg`}
            alt="logo"
            width="128px"
            height="128px"
            className="mb-2"
          />
        </a>

        <ResponsiveMotionContainer
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={animations.slideInFromTop}
          className={clsx("outer-header", "lg:block lg:opacity-100")}
        >
          <div className="inner-header">
            <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="nav-li mx-2">
                  <NavLink title="Services" to="" />
                  <div className="dot" />
                  <NavLink title="pricing" to="" />
                </li>
                <li
                  className={clsx(
                    "max-lg:hidden transition-transform duration-500 cursor-pointer",
                    "nav-li",
                    "mx-2",
                  )}
                >
                  <LinkScroll
                    to="hero"
                    spy={true}
                    offset={-100}
                    smooth={true}
                    duration={1000}
                  >
                    <img
                      src={`/assets/images/logo.svg`}
                      alt="logo"
                      width={160}
                      height={55}
                      className="mb-2"
                    />
                  </LinkScroll>
                </li>
                <li className="nav-li mx-2">
                  <NavLink title="FAQ" to="" />
                  <div className="dot" />
                  <NavLink title="Contact" to="" />
                </li>
              </ul>
            </nav>
            {isOpen && (
              <BackgroundSidebar
                backdropImageUrl="/assets/images/sidebar.svg"
                backdropPosition="center"
                backdropSize="cover"
                backdropOpacity={0.1}
              />
            )}
          </div>
        </ResponsiveMotionContainer>
        {/* Toggle Button (for mobile) */}
        <div className="lg:hidden z-30">
          <Toggle isOpen={isOpen} onToggle={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
