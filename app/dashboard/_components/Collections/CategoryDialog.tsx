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

import { useCookies } from "@/lib/hooks/cookiesState";

export default function CategoryDialog(props: any) {
  const { session } = useCookies();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.baseURL}/api/categories/${props.categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
        }
      );
      const data = await response.json();
      if (data.message === "category deleted successfuly") {
        props.setDeleteState(!props.deleteState);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1 className="cursor-pointer">...</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={` w-56 bg-background`}>
        <DropdownMenuLabel>{props.category}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleDelete}
          className="  text-red-700 hover:text-red-500 ease-in duration-150 font-bold"
        >
          <MdDelete className="mr-2 h-4 w-4" />
          <span>Delete Category</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
