/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import NavbarIcon from "../../public/svg/Navbar-icon.svg";

export const NavIcon = ({
  className,
  ...rest
}: {
  className?: string,
  [ key: string]: any;
  }) => {
  return <NavbarIcon className={`w-full h-auto ${className}`} {...rest}/>
}