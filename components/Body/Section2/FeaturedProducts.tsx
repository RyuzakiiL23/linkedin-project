import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDotFill } from "react-icons/go";

export default function FeaturedProducts() {
  const products = [
    {
      name: "Product 1",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      newPrice: "2,499.00 dh",
      discount: "500.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/1",
      availability: true,
    },
    {
      name: "Product 2",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      newPrice: "2,499.00 dh",
      discount: "500.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/2",
      availability: false,
    },
    {
      name: "Product 3",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/3",
      availability: true,
    },
    {
      name: "Product 4",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      newPrice: "2,499.00 dh",
      discount: "500.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/4",
      availability: true,
    },
    {
      name: "Product 5",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/5",
      availability: true,
    },
    {
      name: "Product 6",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      image1: "/Chaise1.webp",
      image2: "/Chaise2.webp",
      link: "/product/6",
      availability: true,
    },
  ];
  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <div className="flex justify-between">
        <h2 className=" font-bold h-full justify-center items-center text-primary text-2xl py-6">
          BestProducts
        </h2>
        <Link
          href="/link"
          className=" cursor-pointer font-semibold h-full justify-center items-center text-cyan-400 text-md py-6"
        >
          See more
        </Link>
      </div>
      <div className="flex justify-between h-full">
        {products.map((product) => (
          <Link href={`/products/${product.name}`}
            key={product.name}
            className="w-[400px] h-full p-2 relative bg-card border overflow-hidden group cursor-default"
          >
            <div className="relative group h-60">
              <span
                className={` absolute z-40 px-2 bg-destructive text-white font-semibold text-xs ${
                  product.discount ? "" : "hidden"
                }`}
              >
                -{product.discount}
              </span>
              <Image
                src={product.image2}
                alt={product.name}
                width={500}
                height={500}
                className="group-hover:opacity-100 opacity-0 transition duration-300 ease-out absolute cursor-pointer"
              />
              <Image
                src={product.image1}
                alt={product.name}
                width={500}
                height={500}
                className="group-hover:opacity-0 transition duration-300 ease-out absolute cursor-pointer"
              />
            </div>
            <div className="p-4 h-full">
              <h3 className="text-xs font-md text-muted-foreground hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.brand}
              </h3>
              <h4 className="font-semibold text-sm py-2 text-primary hover:text-cyan-400 transition duration-200 ease-out cursor-pointer">
                {product.name}
              </h4>
              <div className="flex mt-6 gap-4 items-center mb-2">
                <p className="text-cyan-400 text-semibold">
                  {product.newPrice ? product.newPrice : product.price}
                </p>
                <p className="text-small line-through	text-xs text-muted-foreground">
                  {product.newPrice ? product.price : ""}
                </p>
              </div>
              <div
                className={`${
                  product.availability ? "text-green-600" : "text-destructive"
                } font-semibold text-sm flex items-center gap-2 `}
              >
                <GoDotFill/>
                <p>{product.availability ? "in stock" : "out of stock"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
