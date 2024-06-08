import React, { useState } from "react";
import CategoryDialog from "./Collections/CategoryDialog";

export default function DashCollections() {
  const collections = [
    {
      image: "imag",
      name: "name",
      description: "description",
      delete: "delete",
    },
    {
      image: "imag",
      name: "name",
      description: "description",
      delete: "delete",
    },
    {
      image: "imag",
      name: "name",
      description: "description",
      delete: "delete",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  return (
    <div className="h-full m-8">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[20%]">name</div>
        {/* <div className="p-2 w-[10%]">status</div> */}
        <div className="p-2 w-[40%]">description</div>
        <div className="p-2 w-[5%]">...</div>
      </div>
      {collections.map((item: any) => (
        <div
          key={item.name}
          className="flex relative items-center justify-between h-16"
        >
          <div className="p-2 w-[10%]">{item.image}</div>
          <div className="p-2 w-[20%]">{item.name}</div>
          {/* <div className="p-2 w-[10%]">{item.status}</div> */}
          <div className="p-2 w-[40%]">{item.description}</div>
          <div onClick={() => setDialogOpen(true)} className="p-2 w-[5%]">
            <CategoryDialog
              category={item.name}
              categoryId={item._id}
              setDialogOpen={setDialogOpen}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
