"use client";
import React, { useEffect, useState } from "react";
import ProductDialog from "./ProductDialog";

export default function ProductsTables(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setPruducts] = useState<any>([]);
  return (
    <div className="border rounded m-4 ">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[30%]">name</div>
        <div className="p-2 w-[10%]">price</div>
        <div className="p-2 w-[10%]">status</div>
        <div className="p-2 w-[20%]">collection</div>
        <div className="p-2 w-[5%]">...</div>
      </div>
      {products ? (
        products.map((item: any) => (
          <div
            key={item._id}
            className="flex relative items-center justify-between h-16"
          >
            <div className="p-2 w-[10%]">
              {item.image ? item.image : item.name}
            </div>
            <div className="p-2 w-[30%]">{item.name}</div>
            <div className="p-2 w-[10%]">{item.price}</div>
            <div className="p-2 w-[10%]">
              {item.status ? "active" : "inactive"}
            </div>
            <div className="p-2 w-[20%]">{item.category}</div>
            <div onClick={() => setDialogOpen(true)} className="p-2 w-[5%]">
              <ProductDialog
                product={item.name}
                productId={item._id}
                setDialogOpen={setDialogOpen}
              />
            </div>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
