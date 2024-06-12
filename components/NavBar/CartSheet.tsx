"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FaCartArrowDown,
  FaCartShopping,
  FaMoneyCheckDollar,
  FaRegTrashCan,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Cookies from "universal-cookie";

interface Article {
  id: number;
  title: string;
  category_name: string;
  price: string;
  image: string;
  link: string;
  availability: boolean;
  discount?: string;
  newPrice?: string;
}
import { RootState } from "@/lib/store";
import { cartUpdate } from "@/lib/features/CartState/CartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartSheet() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const cart = cookies.get("cart") || [];
  const [sheetOpen, setSheetOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const session = cookies.get("session");
  const cartState = useSelector((state: RootState) => state.cart.cart);
  const [cartus, setCartus] = useState(true);

  const handleRemoveArticle = async (id: number) => {
    console.log("id", id);
    try {
      const response = await fetch(
        `${process.env.baseURL}/api/cart/${id.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to remove article");
      }
      setCartus(!cart);
      // dispatch(cartUpdate());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/cart`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
        });
        if (!response.ok) {
          setArticles([]);
          throw new Error("Failed to fetch articles");
        }
        const data: Article[] = await response.json();
        setArticles(data);
        // setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        // setLoading(false);
      }
    };

    fetchArticles();
  }, [session, cartState, cartus]);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex justify-center items-center relative h-10 w-10 hover:scale-[105%] duration-300">
          <div className="bg-red-500 absolute right-0 top-0 rounded-full text-[10px] h-4 w-4 text-center font-semibold text-white">
            {articles.length}
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
            {articles.length === 0 ? (
              <div className="flex justify-center items-center text-xl text-muted-foreground gap-4">
                <FaCartArrowDown />
                <p className="text-center ">Your cart is empty </p>
              </div>
            ) : articles.length === 0 ? (
              <div>empty cart</div>
            ) : (
              articles.map((article) => (
                <div className="relative" key={article.id}>
                  <Link
                    onClick={() => setSheetOpen(false)}
                    className="relative w-full cursor-pointer"
                    href={`/products/${article.id}`}
                  >
                    <div className="absolute z-50 bg-cyan-400 opacity-0 hover:opacity-10 h-full w-full"></div>
                    <div className="bg-background flex border rounded-lg px-4 mb-4 relative cursor-pointer">
                      <div className=" h-full flex items-center justify-center cursor-default relative border m-1">
                        <Image
                          src={article.image}
                          alt={`Image for ${article.category_name}`}
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
                            {article.title}
                          </span>
                          <br />
                          <span className="text-primary">
                            {article.price} dh
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div
                    onClick={() => handleRemoveArticle(article.id)}
                    className="absolute ease-in-out duration-300 hover:text-red-600 hover:cursor-pointer right-0 bottom-0 m-2 z-50"
                  >
                    <FaRegTrashCan style={{ fontSize: "18px" }} />
                  </div>
                </div>
              ))
            )}
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
