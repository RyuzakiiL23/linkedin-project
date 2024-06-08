import Image from "next/image";
import "./category.css";
import React from "react";
import Link from "next/link";

export default function CollectionCard() {
  const Collections = {
    name: "Collection name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/rog.png",
    link: "/categories/1",
  };

  // Create an array with 20 elements
  const collectionsArray = Array.from({ length: 20 }, (_, i) => Collections);
  return (
    <div className="cursor-pointer">
      <div className="flex flex-wrap gap-8 justify-between">
        {collectionsArray.map((collection, index) => (
          <div key={index} className="border rounded w-96 ">
            <div className="cardUi">
              <Link href={collection.link} className="card1 ">
                <div className="flex justify-center items-center hover:opacity-50 duration-150 ease-out">
                  <h1 className="text-cyan-400 absolute text-center w-full font-bold text-xl">
                    {collection.name}
                  </h1>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={400}
                    height={100}
                  />
                </div>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
