"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import NavLink from "../helper/LinkScroll";
import { Link as LinkScroll } from "react-scroll";
import Toggle from "../helper/ToggleButton";
import useMotion from "../hooks/use-motion";

const AnimatedHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { motion: m, animations } = useMotion();

  const fallback = !motion || !m.div || !animations.slideInFromTop;

  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50 py-6 bg-white">
      <div className="container flex items-center justify-between max-lg:px-5 relative">
        {/* Logo */}
        <a className="flex-1 cursor-pointer z-20" href="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width="128"
            height="128"
            className="mb-2"
          />
        </a>

        {/* Backdrop Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/40 z-10 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        {fallback ? (
          <div
            className={clsx(
              "outer-header absolute top-full left-0 w-full bg-white lg:static lg:block",
              isOpen ? "max-lg:block max-lg:py-6" : "max-lg:hidden",
            )}
          >
            <nav>
              <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 max-lg:px-12">
                <li>
                  <NavLink
                    title="Services"
                    to="services"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li>
                  <NavLink
                    title="Pricing"
                    to="pricing"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li className="mx-4">
                  <LinkScroll to="home" smooth={true} duration={1000}>
                    <img
                      src="/assets/images/logo.svg"
                      alt="logo"
                      width={160}
                      height={55}
                    />
                  </LinkScroll>
                </li>
                <li>
                  <NavLink
                    title="FAQ"
                    to="faq"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li>
                  <NavLink
                    title="Contact"
                    to="contact"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <m.div
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={animations.slideInFromTop}
            className={clsx(
              "outer-header absolute top-full left-0 w-full bg-white lg:static lg:block z-20",
              isOpen
                ? "max-lg:opacity-100 max-lg:py-6"
                : "max-lg:opacity-0 max-lg:pointer-events-none",
            )}
          >
            <nav>
              <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 max-lg:px-12">
                <li>
                  <NavLink
                    title="Services"
                    to="services"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li>
                  <NavLink
                    title="Pricing"
                    to="pricing"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li className="mx-4">
                  <LinkScroll to="home" smooth={true} duration={1000}>
                    <img
                      src="/assets/images/logo.svg"
                      alt="logo"
                      width={160}
                      height={55}
                    />
                  </LinkScroll>
                </li>
                <li>
                  <NavLink
                    title="FAQ"
                    to="faq"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
                <li>
                  <NavLink
                    title="Contact"
                    to="contact"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
              </ul>
            </nav>
          </m.div>
        )}

        {/* Toggle Button */}
        <div className="lg:hidden z-30">
          <Toggle isOpen={isOpen} onToggle={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeader;
