import React, { useEffect, useState } from "react";
import ProductDialog from "./Products/ProductDialog";
import Image from "next/image";

export default function DashProducts(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/products`, {
          method: "GET",
          credentials: "include",
          headers: {},
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [dialogOpen, props.productDialogOpen]);

  return (
    <div className="h-full m-8  ">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[20%]">name</div>
        <div className="p-2 w-[30%]">collection</div>
        <div className="p-2 w-[10%]">price</div>
        <div className="p-2 mr-4 w-[5%]">...</div>
      </div>
      <div className=" h-[60vh] overflow-auto">
        {products ? (
          products.map((item: any) => (
            <div
              key={item.id}
              className="flex relative items-center justify-between h-16"
            >
              <div className="p-2 w-[10%]">
                <Image
                  src={item.image ? item.image : item.name}
                  width={50}
                  height={50}
                  alt={item.name}
                />
              </div>
              <div className="p-2 w-[20%]">{item.title}</div>
              <div className="p-2 w-[30%]">{item.category_name}</div>
              <div className="p-2 w-[10%]">{item.price}</div>
              <div onClick={() => setDialogOpen(true)} className="p-2 w-[5%]">
                <ProductDialog
                  product={item.title}
                  productId={item.id}
                  setDialogOpen={setDialogOpen}
                />
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
