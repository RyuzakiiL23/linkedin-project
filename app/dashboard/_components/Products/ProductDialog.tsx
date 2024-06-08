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
        {/* <DropdownMenuGroup>
          <Link
            onClick={() => dispatch(changeState("Profile"))}
            href={`/dashboard/${session?.user?.name}/profile`}
          >
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>
          <Link href={`/dashboard/${session?.user?.name}/settings`}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        {/* <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4 bg-background" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-background">
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4 " />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem disabled>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>
            <FiHome className="mr-2 h-4 w-4" />
            <span>Matjarify</span>
          </DropdownMenuItem>
        </Link> */}
        <DropdownMenuItem
          // onClick={async () => {
          //   const res = await deleteProduct(props.productId);
          //   if (res.message === "Product deleted successfully") {
          //     props.setDialogOpen(false);
 
          //   }
          // }}
          className="  text-red-700 hover:text-red-500 ease-in duration-150 font-bold"
        >
          <MdDelete className="mr-2 h-4 w-4" />
          <span>Delete Product</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
