import React, { useState } from "react";
import ProductDialhg from "./Products/ProductDialog";
import ProductDialog from "./Products/ProductDialog";

export default function DashProducts() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const products = [
    {
      _id: "1",
      image: "imag",
      name: "name",
      description: "description",
      collection: 'collection name',
      delete: "delete",
      price: "price",
    },
    {
      _id: "2",
      image: "imag",
      name: "name",
      description: "description",
      collection: 'collection name',
      delete: "delete",
      price: "price",
    },
    {
      _id: "3",
      image: "imag",
      name: "name",
      description: "description",
      collection: 'collection name',
      delete: "delete",
      price: "price",
    },
  ];
  return (
    <div className="h-full m-8 ">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[20%]">name</div>
        <div className="p-2 w-[30%]">collection</div>
        <div className="p-2 w-[10%]">price</div>
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
            <div className="p-2 w-[20%]">{item.name}</div>
            <div className="p-2 w-[30%]">{item.collection}</div>
            <div className="p-2 w-[10%]">{item.price}</div>
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
