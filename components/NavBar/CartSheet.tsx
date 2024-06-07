"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from 'universal-cookie';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FaCartShopping,
  FaMoneyCheckDollar,
  FaRegTrashCan,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Cookies from "universal-cookie";
import { get } from "http";

interface Article {
  name: string;
  id: number;
  brand: string;
  processor: string;
  price: number;
  principalImage: string;
}

function CartSheet() {
  const cookies = new Cookies();
  const cart = cookies.get("cart") || [];
  const [sheetOpen, setSheetOpen] = useState(false);
  //   const [articles, setArticles] = useState<Article[]>([]);

  const articles = [
    {
      id: 1,
      name: "Product 6",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      image1: "/Chaise1.webp",
      link: "/product/6",
      availability: true,
      discount: "500.00 dh",
      newPrice: "2,499.00 dh",
    },
    {
      id: 1,
      name: "Product 6",
      brand: "SKILLCHAIRS",
      price: "2,999.00 dh",
      image1: "/Chaise2.webp",
      link: "/product/6",
      availability: true,
      discount: "500.00 dh",
      newPrice: "2,499.00 dh",
    },
  ];

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex justify-center items-center relative h-10 w-10 hover:scale-[105%] duration-300">
          <div className="bg-red-500 absolute right-0 top-0 rounded-full text-[10px] h-4 w-4 text-center font-semibold text-white">
            {cart.length}
          </div>
          <div className="text-[24px]">
            <FaCartShopping />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col h-full relative">
          <div className="flex justify-center items-center mb-8 border-b">
            My Cart <FaCartShopping className="ml-2 my-4" />
          </div>
          <ScrollArea className="flex flex-col h-full relative">
            {articles.map((article) => (
              <Link
                key={article.id}
                onClick={() => setSheetOpen(false)}
                className="relative w-full cursor-pointer"
                href={`/products/${article.name}`}
              >
                <div className="absolute z-50 bg-cyan-400 opacity-0 hover:opacity-10 h-full w-full"></div>
                <div className="bg-background flex border rounded-lg px-4 mb-4 relative cursor-pointer">
                  <div className=" h-full flex items-center justify-center cursor-default relative border m-1">
                    <Image
                      src={article.image1}
                      alt={`Image for ${article.brand}`}
                      className="cursor-pointer rounded object-cover"
                      height={60}
                      width={60}
                      //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex flex-col items-left justify-center bg-red z-40">
                    <div className="des pl-4 bg-background">
                      <span className="text-muted-foreground">
                        {article.name}
                      </span>
                      <br />
                      <span className="text-primary">{article.price}</span>
                    </div>
                  </div>
                  {/* <div onClick={() => handleRemoveCookie(article.id)} className='absolute ease-in-out duration-300 hover:text-red-600 hover:cursor-pointer right-0 bottom-0 m-2 '>
                  <FaRegTrashCan style={{ fontSize: '18px' }} />
                </div> */}
                </div>
              </Link>
            ))}
          </ScrollArea>
          <Link
            onClick={() => setSheetOpen(false)}
            className="flex flex-col w-full mb-4"
            href="/cart"
          >
            <Button className="gap-2" variant="outline">
              Access Cart <FaCartShopping />
            </Button>
          </Link>
          <Link
            onClick={() => setSheetOpen(false)}
            className="flex flex-col w-full"
            href="/checkout"
          >
            <Button className="gap-2">
              Buy Now <FaMoneyCheckDollar />
            </Button>
          </Link>
        </div>
      </SheetContent>
      <SheetTrigger></SheetTrigger>
    </Sheet>
  );
}

export default CartSheet;
