"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

interface Collection {
  name: string;
  description: string;
  image: string;
  link: string;
  id: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  category_name: string;
}

const Collections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollections();
    fetchProducts();
  }, []);

  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <h2 className="w-full text-start font-bold h-full justify-center items-center text-primary text-2xl py-10">
        Collections
      </h2>
      <div className="flex flex-col gap-20">
        {collections.map((collection) => (
          <div key={collection.name} className="flex bg-muted-foreground">
            <div className="flex h-96 w-96 justify-center items-center">
              <div className="w-[400px] h-[270px] p-8 bg-muted-foreground relative overflow-hidden group cursor-default">
                <h4 className="font-bold text-xl pb-2 text-muted">
                  {collection.name}
                </h4>
                <p className="text-muted relative z-40">
                  {collection.description}
                </p>
                <Link href={`/categories/${collection.id}`}>
                  <button className="mt-4 bg-primary text-white py-2 font-semibold px-4">
                    voir plus
                  </button>
                </Link>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width="240"
                  height={68}
                  style={{ height: "auto" }}
                  className="absolute z-30 bottom-[-40px] right-[-20px] group-hover:bottom-[-20px] transition-all duration-500 ease-out"
                />
              </div>
            </div>
            <div className="flex w-full m-2 h-full relative">
              {products
                .filter((product) => product.category_id === collection.id)
                .slice(0, 5)
                .map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="w-1/5 h-full p-2  relative bg-card border overflow-hidden group cursor-default"
                  >
                    <div className="relative group h-60">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className=" absolute cursor-pointer"
                      />
                    </div>
                    <div className=" h-full">
                      <h3 className="text-xs font-md text-muted-foreground hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                        {product.category_name}
                      </h3>
                      <h4 className="font-semibold text-sm py-2 h-10 text-primary hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                        {product.title}
                      </h4>
                      <div className="flex mt-6 gap-2 items-center mb-2 ">
                        <p className="text-cyan-400 text-semibold">
                          {product.price} dh
                        </p>
                        <div className="text-green-600 font-semibold text-sm flex items-center gap-2">
                          <GoDotFill />
                          <p>In stock</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
