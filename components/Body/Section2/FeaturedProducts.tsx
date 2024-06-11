'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { fetchProducts } from "@/lib/fetchFolder/fetchCategories";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        if (data) {
          setProducts(data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold h-full justify-center items-center text-primary text-2xl py-6">
          Best Products
        </h2>
        <Link
          href="/products/all"
          className="cursor-pointer font-semibold h-full justify-center items-center text-cyan-400 text-md py-6"
        >
          See more
        </Link>
      </div>
      <div className="flex justify-between h-full">
        {products.slice(1, 7).map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="w-[400px] h-full p-2 relative bg-card border overflow-hidden group cursor-default"
          >
            <div className="relative group h-60">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="absolute group-hover:opacity-100 opacity-0 transition duration-300 ease-out cursor-pointer"
              />
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="absolute group-hover:opacity-0 transition duration-300 ease-out cursor-pointer"
              />
            </div>
            <div className="p-4 h-full">
              <h3 className="text-xs font-md text-muted-foreground hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.category_name}
              </h3>
              <h4 className="font-semibold text-sm py-2 text-primary hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.title}
              </h4>
              <div className="flex mt-6 gap-4 items-center mb-2">
                <p className="text-cyan-400 text-semibold">{product.price} dh</p>
              </div>
              <div className="text-green-600 font-semibold text-sm flex items-center gap-2">
                <GoDotFill />
                <p>In stock</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
