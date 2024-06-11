"use client";

import Counter from "@/components/Utils/Counter";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function RightSide(props: any) {
  const cookies = new Cookies(null, { path: "/" });
  const [count, setCount] = React.useState(1);
  const router = useRouter();
  const session = cookies.get("session");

  const { product } = props;

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${process.env.baseURL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity: count }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      // Optionally handle success response
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      router.push("/checkout");
    } catch (error) {
      console.error("Error processing buy now:", error);
    }
  };

  return (
    <div className="w-1/2 border bg-background p-8 h-full sticky top-28">
      <div className="w-full border-b">
        <h1 className="text-primary text-2xl font-bold">{product.title}</h1>
        <h2 className="text-cyan-400 font-bold text-sm my-8">
          {product.category_name}
        </h2>
      </div>
      <div>
        <div className="flex my-8 items-center">
          <h1 className="text-primary font-semibold text-sm w-20">Price</h1>
          <h2 className="text-cyan-400 text-xl">{product.price}.00 dh</h2>
        </div>
        <div className="flex my-8 items-center">
          <h1 className="text-primary font-semibold text-sm w-20">Quantity</h1>
          <Counter setCount={setCount} count={count} />
          <div
            className={`text-green-600 font-semibold text-sm flex items-center gap-2`}
          >
            <GoDotFill />
            <p>in stock</p>
          </div>
        </div>
        <div className="flex w-full gap-8 items-center">
          <button
            onClick={handleAddToCart}
            className="border text-white p-4 w-1/2 hover:opacity-90 duration-150 ease-out bg-orange-500 rounded font-bold"
          >
            Add to cart
          </button>
          <button
            onClick={handleBuyNow}
            className="border text-white p-4 w-1/2 hover:opacity-90 duration-150 ease-out bg-cyan-400 rounded font-bold"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
