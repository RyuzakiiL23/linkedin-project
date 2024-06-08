"use client";
import { getProductsByStore } from "@/lib/actions/productActions";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductDialog from "./ProductDialog";

export default function ProductsTables(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setPruducts] = useState<any>([]);
  const dashState = useSelector((state: RootState) => state.dash.value);
  useEffect(() => {
    const storeProducts = async () => {
      const res = await getProductsByStore(dashState);
      if (res && typeof res === "object" && "message" in res) {
        setPruducts([{}]);
      } else {
        setPruducts(await getProductsByStore(dashState));
      }
    };
    storeProducts();
  }, [dashState, props.open, dialogOpen]);
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
