"use client";


import { useState } from "react";
import DashProducts from "./DashProducts";
import DashCollections from "./DashCollections";
import CreateCategory from "./Collections/CreateCategory";
import AddProductDialog from "./Products/AddProductDialog";

export default function DashboadContainer() {
  const [active, setActive] = useState("collections");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="h-10 flex relative border-b items-center">
        <div
          onClick={() => setActive("collections")}
          className={`w-1/2 text-center cursor-pointer z-40`}
        >
          Collections
        </div>
        <div className="border-r h-full"></div>
        <div
          onClick={() => setActive("products")}
          className={`w-1/2 text-center cursor-pointer z-40`}
        >
          Products
        </div>
        <div
          className={`absolute h-full w-1/2 bg-primary duration-300 ease-out z-10`}
          style={{
            transform: active === "collections" ? "translateX(0%)" : "translateX(100%)",
          }}
        ></div>
      </div>
      <div>
        {active === "collections" ? (
          <div className="h-full ">
            <DashCollections />
            <CreateCategory setDialogOpen={setDialogOpen} />
          </div>
        ) : (
          <div className="h-full  ">
            <DashProducts/>
            <AddProductDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
