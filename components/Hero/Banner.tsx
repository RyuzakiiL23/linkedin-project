import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex relative h-96 border rounded justify-center items-center text-6xl bg-border">
      <Image
        src={`/placeholder-image.webp`}
        alt="image"
        fill={true}
        className="absolute z-1"
      />
    </div>
  );
}
