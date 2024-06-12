"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Cookies from "universal-cookie";
import { FaCartArrowDown } from "react-icons/fa6";
interface Article {
  id: number;
  title: string;
  category_name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CltDetails {
  Prénom: string;
  Nom: string;
  Adresse: string;
  Code_postal: string;
  Ville: string;
  Téléphone: string;
}

export default function Checkout() {
  const [cltDetails, setCltDetails] = useState<CltDetails>({
    Prénom: "",
    Nom: "",
    Adresse: "",
    Code_postal: "",
    Ville: "",
    Téléphone: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cookies = new Cookies();
  const session = cookies.get("session");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setArticles(data);
        calculateTotalPrice(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [session]);

  const calculateTotalPrice = (articles: Article[]) => {
    const total = articles.reduce((acc, article) => acc + article.price, 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCltDetails({ ...cltDetails, [name]: value });
  };

  return (
    <div>
      {articles.length === 0 ? (
        <div className="flex justify-center min-h-[70vh] items-center text-4xl text-muted-foreground gap-4">
          <FaCartArrowDown />
          <p className="text-center ">Your cart is empty </p>
        </div>
      ) : (
        <div className="flex relative min-h-[60vh] mt-10">
          <div className="w-[60%] mr-4">
            <div className="flex flex-col gap-4 ml-20 mr-10">
              <div>
                <p>Livraison</p>
              </div>
              <div className="flex gap-4">
                <Input
                  placeholder="Prénom"
                  type="text"
                  id="Prénom"
                  name="Prénom"
                  value={cltDetails.Prénom}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
                <Input
                  placeholder="Nom"
                  type="text"
                  id="Nom"
                  name="Nom"
                  value={cltDetails.Nom}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <Input
                placeholder="Adresse"
                type="address"
                id="Adresse"
                name="Adresse"
                value={cltDetails.Adresse}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
              <div className="flex gap-4">
                <Input
                  placeholder="Ville"
                  type="text"
                  id="Ville"
                  name="Ville"
                  value={cltDetails.Ville}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
                <Input
                  placeholder="Code postal"
                  type="text"
                  id="Code_postal"
                  name="Code_postal"
                  value={cltDetails.Code_postal}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <Input
                placeholder="Téléphone"
                type="tel"
                id="Téléphone"
                name="Téléphone"
                value={cltDetails.Téléphone}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex w-full justify-between px-20">
              <span className="p-4">Total</span>
              <span className="p-4 text-primary ">{totalPrice} Dh</span>
            </div>
          </div>
          <div className="w-[40%] mr-10">
            <div className="flex border-b relative">
              <p className="ml-4 w-[64%]">Products</p>
              <p className="ml-4 w-[18%]"></p>
              <p className="ml-4 w-[18%]">Prices</p>
            </div>
            {articles.map((article) => (
              <div
                className="bg-background flex border-b px-4 relative"
                key={article.id}
              >
                <div className="flex items-center justify-between w-full px-8 ">
                  <div className="w-[30%] h-[150px] flex items-center justify-center cursor-default relative">
                    <Link
                      // onClick={() => setSheetOpen(false)}
                      className="relative w-full h-2/3"
                      href={`/shop/${article.id}`}
                    >
                      <Image
                        src={article.image}
                        alt={`Image for ${article.category_name}`}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col items-left justify-center cursor-default bg-red">
                    <div className="pl-4 bg-background">
                      <span className="text-muted-foreground">
                        {article.category_name}
                      </span>
                      <br />
                      <span className="text-forground hover:text-ring cursor-pointer ">
                        {article.title}
                      </span>
                      <br />
                    </div>
                  </div>
                  <span className="text-primary">{article.price} Dh</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
