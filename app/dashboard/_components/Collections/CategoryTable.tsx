"use client";

import { getSpecificCategories } from "@/lib/actions/categoryActions";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoryDialog from "./CategoryDialog";
import CreateCategory from "./CreateCategory";

export default function CategoriesTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const dashState = useSelector((state: RootState) => state.dash.value);
  useEffect(() => {
    const storeCategories = async () => {
      const res = await getSpecificCategories(dashState);
      if (res && typeof res === "object" && "message" in res) {
        setCategories([{}]);
      } else {
        setCategories(res.categories);
      }
    };
    storeCategories();
  }, [dashState, dialogOpen]);


  return (
    <div className="border rounded m-4 ">
      <div className="flex relative items-center justify-between border-b">
        {/* <div className="p-2 w-[10%]">img</div> */}
        <div className="p-2 w-[30%]">name</div>
        {/* <div className="p-2 w-[10%]">status</div> */}
        <div className="p-2 w-[20%]">items</div>
        <div className="p-2 w-[5%]">...</div>
      </div>
      {categories.map((item: any) => (
        <div
          key={item._id}
          className="flex relative items-center justify-between h-16"
        >
          {/* <div className="p-2 w-[10%]">{item.image}</div> */}
          <div className="p-2 w-[30%]">{item.name}</div>
          {/* <div className="p-2 w-[10%]">{item.status}</div> */}
          <div className="p-2 w-[20%]">{item.products}</div>
          <div onClick={() => setDialogOpen(true)} className="p-2 w-[5%]">
            <CategoryDialog
              category={item.name}
              categoryId={item._id}
              setDialogOpen={setDialogOpen}
            />
          </div>
        </div>
      ))}
      <CreateCategory setDialogOpen={setDialogOpen}/>
    </div>
  );
}
