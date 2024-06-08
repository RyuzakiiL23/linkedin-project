"use client";
import Counter from "@/components/Utils/Counter";
import React, { use, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addProduct } from "@/lib/features/CartState/CartSlice";
import Cookies from "universal-cookie";
import {cartCookies, } from "@/lib/hooks/cartCookies";


export default function RightSide(props: any) {
  const cookies = new Cookies(null, { path: "/" });
  const [count, setCount] = React.useState(1);
  const cart = { id: '3', quantity: count };
  // const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart.cart);
  // const val = { id: props.product.id, quantity: count };

  const { product } = props;
  return (
    <div className="w-1/2 border bg-background p-8 h-full sticky top-28 ">
      <div className="w-full border-b">
        <h1 className="text-primary text-2xl font-bold">{product.name}</h1>
        <h2 className="text-cyan-400 font-bold text-sm my-8">
          {product.brand}
        </h2>
      </div>
      <div>
        <div className="flex my-8  items-center">
          <h1 className="text-primary font-semibold text-sm w-20 ">Price</h1>
          <h2 className="text-cyan-400 text-xl">{product.price}.00 dh</h2>
        </div>
        <div className="flex my-8  items-center">
          <h1 className="text-primary font-semibold text-sm w-20">Quantity</h1>
          <Counter setCount={setCount} count={count} />
          <div
            className={`${
              product.availability ? "text-green-600" : "text-destructive"
            } font-semibold text-sm flex items-center gap-2 `}
          >
            <GoDotFill />
            <p>{product.availability ? "in stock" : "out of stock"}</p>
          </div>
        </div>
        <div className="flex w-full gap-8 items-center">
          <button
            onClick={() => cartCookies(cart)}
            className="border text-white p-4 w-1/2 hover:opacity-90 duration-150 ease-out bg-orange-500 rounded font-bold"
          >
            Add to cart
          </button>
          <button className="border text-white p-4 w-1/2 hover:opacity-90 duration-150 ease-out bg-cyan-400 rounded font-bold">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
