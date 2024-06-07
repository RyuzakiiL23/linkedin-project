import React from "react";
import DarkLightToggle from "./DarkLightToggle";
import User from "../User/User";
import Link from "next/link";
import { HeadersCollections } from "../Headers/HeadersCollections";
import CartSheet from "./CartSheet";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between border-b border-opacity-30 h-20 px-10 backdrop-blur-lg z-50 sticky w-full top-0 shadow-sm">
      <div className="cursor-pointer">
        <Link href="/">Logo</Link>
      </div>
      <div className="">
        <HeadersCollections />
      </div>
      <div className="flex gap-4 items-center">
        <User />
          <CartSheet />
        <DarkLightToggle />
      </div>
    </div>
  );
}
