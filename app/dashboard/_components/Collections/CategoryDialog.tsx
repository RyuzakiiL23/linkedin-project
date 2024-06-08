"use client";
import React from "react";
import { MdDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CategoryDialog(props: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1 className="cursor-pointer">...</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={` w-56 bg-background`}>
        <DropdownMenuLabel>{props.category}</DropdownMenuLabel>
        <DropdownMenuItem
          // onClick={async () => {
          //   const res = await deleteCategory(props.categoryId);
          //   if (res.message === "Category deleted") {
          //     props.setDialogOpen(false);
 
          //   }
          // }}
          className="  text-red-700 hover:text-red-500 ease-in duration-150 font-bold"
        >
          <MdDelete className="mr-2 h-4 w-4" />
          <span>Delete Category</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
