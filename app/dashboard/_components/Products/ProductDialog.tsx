"use client";
import React from "react";
import { MdDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductDialog(props: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1 className="cursor-pointer">...</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={` w-56 bg-background`}>
        <DropdownMenuLabel>{props.product}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="  text-red-700 hover:text-red-500 ease-in duration-150 font-bold"
        >
          <MdDelete className="mr-2 h-4 w-4" />
          <span>Delete Product</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
