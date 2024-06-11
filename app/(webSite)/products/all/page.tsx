"use client";

import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  discount?: string;
  availability?: boolean;
}

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <div className="flex justify-between">
        <h2 className=" font-bold h-full justify-center items-center text-primary text-2xl py-6">
          All Products
        </h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="my-8 h-full w-60 p-2 relative bg-card border overflow-hidden group cursor-default"
          >
            <div className="relative group h-60 flex justify-center items-center">
              {product.discount && (
                <span className="absolute z-40 px-2 bg-destructive text-white font-semibold text-xs">
                  {product.discount}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="group-hover:opacity-100 opacity-0 transition duration-300 ease-out absolute cursor-pointer"
              />
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="group-hover:opacity-0 transition duration-300 ease-out absolute cursor-pointer"
              />
            </div>
            <div className="p-4 h-full">
              <h3 className="text-xs font-md text-muted-foreground hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.category_name}
              </h3>
              <h4 className="font-semibold h-10 text-sm py-2 text-primary hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.title}
              </h4>
              <div className="flex mt-6 gap-4 items-center mb-2">
                <p className="text-cyan-400 text-semibold">
                  {product.price} dh
                </p>
              </div>
              <div
                className={`${
                  product.availability ? "text-green-600" : "text-destructive"
                } font-semibold text-sm flex items-center gap-2 `}
              >
                <GoDotFill />
                <p>{product.availability ? "in stock" : "out of stock"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
