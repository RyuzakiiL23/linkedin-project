'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

interface Product {
  id: number;
  title: string;
  category_name: string;
  price: string;
  image: string;
  // image2: string;
  availability: boolean;
  discount?: string;
  newPrice?: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }: { params: { id: string } }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const id = params.id.toString();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/categories/${id}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data)
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Data is not in expected format");
        }
        
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold h-full justify-center items-center text-primary text-2xl py-6">
          {products[0].category_name}
        </h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {products.map((product) => (
          <Link
            href={`${process.env.baseURL}/api/categories/${product.id}/products/`}
            key={product.id}
            className="my-8 h-full w-60 p-2 relative bg-card border overflow-hidden group cursor-default"
          >
            <div className="relative group h-60 justify-center items-center">
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
                  {product.newPrice ? product.newPrice : product.price}
                </p>
                <p className="text-small line-through text-xs text-muted-foreground">
                  {product.newPrice ? product.price : ""}
                </p>
              </div>
              <div
                className={`
                text-green-600
                 font-semibold text-sm flex items-center gap-2`}
              >
                <GoDotFill />
                <p>in stock</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
