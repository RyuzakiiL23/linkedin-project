'use client'
import RightSide from "../_components/id/RightSide";
import LeftSide from "../_components/id/LeftSide";
import FeaturedProducts from "@/components/Body/Section2/FeaturedProducts";
import { useEffect, useState } from "react";

function SingleProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>({});
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [params.id]);

  // const product = {
  //   id: params.id,
  //   name: "SKILLCHAIRS SC12 ETERNITY",
  //   description:
  //   "Chaise Gaming SKILLCHAIRS SC12 ETERNITY - Noir / Rouge - Simili cuir - 150 kg<br>" +
  //   "- 3D - Inclinable - Accoudoirs 4D - Roulettes 60 mm<br>" +
  //   "- Coussins lombaire et cervical inclus<br>" +
  //   "- Repose-pieds intégré - Garantie 2 ans",
  //   brand: "SKILLCHAIRS",
  //   price: 3400,
  //   discount: 500,
  //   availability: true,
  //   image1: "/Chaise1.webp",
  //   image2: "/Chaise2.webp",
  // };
  return (
    <div className="my-8 lg:w-[1400px] mx-auto">
      <div className="flex w-full gap-8 relative">
        <LeftSide product={product} />
        <RightSide product={product} />
      </div>
      <FeaturedProducts />
    </div>
  );
}

export default SingleProduct;
