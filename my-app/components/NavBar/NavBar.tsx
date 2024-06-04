import React from "react";
import DarkLightToggle from "./DarkLightToggle";
import User from "../User/User";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between border-b border-opacity-30 h-20 px-10 backdrop-blur-lg z-50 sticky w-full top-0 shadow-sm">
      <div className="cursor-pointer">Logo</div>
      <div className="flex gap-4 items-center">
        <User />
        <div className="cursor-pointer">cart</div>
        {/* dark mode toggle  */}
        <DarkLightToggle />
      </div>
    </div>
  );
}
