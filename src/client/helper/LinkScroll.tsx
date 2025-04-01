// Author: Bartended Applejack
import React from "react";
import { Link as NavScroll } from "react-scroll";
import { LinkScrollProps } from "../types";

const NavLink = ({ title, to, onClick }: LinkScrollProps) => (
  <NavScroll
    to={to}
    className="nav-scroll"
    smooth={true}
    duration={1000}
    onClick={onClick}
  >
    {title}
  </NavScroll>
);

export default NavLink;
