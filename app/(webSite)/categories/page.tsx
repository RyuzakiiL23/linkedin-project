import Image from "next/image";
import React from "react";
import CollectionCard from "./_components/CollectionCard";

function Categories() {
  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <h1 className="text-primary text-2xl font-bold w-full text-center mb-20">
        All Our Collections
      </h1>
      <CollectionCard />
    </div>
  );
}

export default Categories;
