import React from "react";
import { NavLink } from "react-router-dom";

interface ICustomNavLink {
  to: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const CustomNavLink: React.FC<ICustomNavLink> = ({
  to,
  className,
  activeClassName,
  children,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className ? className : "p-4 m-2 bg-slate-400 rounded"} ${
          isActive ? activeClassName : "text-white hover:text-black"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
