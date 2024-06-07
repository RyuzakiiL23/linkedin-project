import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Collaborations() {
  const collections = ["hp", "asus", 'apple', 'nvidia', 'master-card', 'skrill'];

  const brands = collections.map((name) => ({
    name,
    image: `https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/${encodeURIComponent(
      name
    )}-icon.png`,
    link: `/product/${encodeURIComponent(name)}`,
  }));
  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <h2 className="w-full text-start font-bold h-full justify-center items-center text-primary text-2xl py-10">
       Our Brands
      </h2>
      <div className="flex gap-4 justify-between">
        {brands.map((collection) => (
          <div className="group cursor-pointer" key={collection.name}>
            <div className="w-48 h-20 p-8 bg-muted-foreground rounded cursor-pointer relative flex items-center justify-center overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                fill={true}
                style={{objectFit: "contain"}}
                className="p-4"
              />
            </div>
            <div className="flex text-primary group-hover:text-cyan-400 items-center gap-2 mt-2 justify-center transition-all duration-300 ease-out relative">
              <h3 className="text-lg font-bold">{collection.name}</h3>
              <FaArrowRight className="absolute opacity-0 group-hover:opacity-100 right-0 duration-300 ease-out group-hover:right-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
