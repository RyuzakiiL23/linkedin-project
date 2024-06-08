import DarkLightToggle from "@/components/NavBar/DarkLightToggle";
import Link from "next/link";
import React from "react";
import DashboadContainer from "./_components/DashboadContainer";

export default function Dashboard() {
  
  return (
    <div className=" w-screen relative h-screen">

      {/* NavBar */}  
      <div className="h-10 w-full flex justify-between items-center px-8 bg-secondary-foreground text-primary-foreground">
        <div className="cursor-pointer">
          <Link href="/">Logo</Link>
        </div>
        <div className="">
          Dashboard
        </div>
        <div className="flex gap-4 items-center">
          <h1>user</h1>
          <DarkLightToggle />
        </div>
      </div>

      {/* body */}
      <div className="border m-8 h-[calc(100vh-6.5rem)] bg-background shadow-xl">
        <DashboadContainer />
      </div>
    </div>
  );
}
