import React from "react";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  return <div className="border-b border-zinc-400 dark:border-b-zinc-800 py-2">
    <Logo />
  </div>;
};

export default Navbar;
