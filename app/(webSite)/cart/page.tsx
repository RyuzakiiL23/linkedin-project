'use client';

import React, { useState, useEffect } from 'react';
import { FaCartShopping, FaMoneyCheckDollar, FaRegTrashCan } from 'react-icons/fa6';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Cookies from 'universal-cookie';

interface Article {
  id: number;
  title: string;
  category_name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
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
            "Authorization": `Bearer ${session}`,
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

  const handleRemoveArticle = async (id: number) => {
    try {
      const response = await fetch(`${process.env.baseURL}/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to remove article from cart");
      }
      console.log(response)
      setArticles(articles.filter(article => article.id !== id));
      calculateTotalPrice(articles.filter(article => article.id !== id));
    } catch (error) {
      console.error("Error removing article from cart:", error);
    }
  };

  return (
    <div className='flex flex-col h-full relative'>
      <div className='flex justify-center text-[20px] items-center m-10'>My Cart <FaCartShopping className="ml-2" /></div>

      <div className='flex relative'>
        <div className='flex flex-col w-2/3 relative border mx-4'>
          <div className='flex border relative'>
            <p className='ml-4 w-[56%]'>Produit</p>
            <p className=' w-[20%]'></p>
            <p className='ml-4 w-[20%]'>Prices</p>
          </div>
          {articles.map((article) => (
            <div className="bg-background flex border px-4 relative" key={article.id}>
              <div className='flex w-[60%]'>
                <div className="w-[30%] h-full flex items-center justify-center cursor-default relative">
                  <Link className="relative w-full h-full" href={`/products/${article.id}`}>
                    <Image
                      src={article.image}
                      alt={`Image for ${article.category_name}`}
                      width={100}
                      height={100}
                      style={{objectFit: 'cover'}}
                      className='cursor-pointer p-4'
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-left justify-center cursor-default bg-red z-50">
                  <div className="des pl-4 bg-background">
                    <span className="text-muted-foreground">{article.category_name}</span>
                    <br />
                    <span className="text-primary">{article.title}</span>
                  </div>
                </div>
              </div>
              <div className='w-[20%]'></div>

              <div className='flex w-[20%] items-center relative'>
                <span className="ml-4 text-primary">
                  {article.price} dh
                </span>
              </div>
              <div onClick={() => handleRemoveArticle(article.id)} className='flex ease-in-out duration-300 hover:text-red-600 hover:cursor-pointer items-center'>
                <FaRegTrashCan style={{ fontSize: '18px' }} />
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col w-1/3 h-60 border mr-4 relative md:sticky md:top-20'>
          <div className='flex w-full justify-between'>
            <span className="p-4">Total</span>
            <span className="p-4 text-primary ">{totalPrice} dh</span>
          </div>
          <div className='flex flex-col'>
            <p className='px-4'>Livraison gratuite sur tout le maroc</p>
            <p className='px-4'>3 mois de garantie magasin</p>

            <Link className='flex flex-col w-full' href={"/checkout"}>
              <Button className="gap-2 m-2">Finaliser votre achat <FaMoneyCheckDollar /> </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
