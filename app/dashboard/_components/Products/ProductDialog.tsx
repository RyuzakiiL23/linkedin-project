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
import { useCookies } from "@/lib/hooks/cookiesState";

export default function ProductDialog(props: any) {
  const {session} = useCookies()

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.baseURL}/api/products/${props.productId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session}`,
          },
        }
      );
      const data = await response.json();
      if (data.message === 'product deleted succesfully') {
        props.setDialogOpen(false);
      }
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }
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
          onClick={handleDelete}
        >
          <MdDelete className="mr-2 h-4 w-4" />
          <span>Delete Product</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
