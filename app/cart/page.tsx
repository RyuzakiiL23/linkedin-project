'use client';

import React, { useState } from 'react'
// import Cookies from "universal-cookie";
import { FaCartShopping, FaMoneyCheckDollar, FaRegTrashCan } from 'react-icons/fa6'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface Article {
  name: string,
  id: number;
  brand: string;
  processor: string;
  price: number;
  principalImage: string;
  // Add other properties as needed
}


export default function Cart() {

  const [sheetOpen, setSheetOpen] = useState(false);

  const [count, setCount] = useState<number>(0);

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

    <div className='flex flex-col h-full relative'>
      <div className='flex justify-center text-[20px] items-center m-10'>My Cart <FaCartShopping className="ml-2" /></div>

      <div className='flex relative'>
        <div className='flex flex-col w-2/3 relative border mx-4'>
          <div className='flex border relative'>
            <p className='ml-4 w-[56%]'>Produit</p>
            <p className=' w-[20%]'>Quanité</p>
            <p className='ml-4 w-[20%]'>Total</p>
          </div>
          {articles.map((article) => (
            <div className="bg-background flex border px-4 relative" key={article.id}>
              <div className='flex w-[60%] '>
                <div className="w-[30%] h-[150px] flex items-center justify-center cursor-default relative">
                  <Link onClick={() => setSheetOpen(false)} className="relative w-full h-2/3" href={`/shop/${article.id}`}>
                    <Image
                      src={article.image1}
                      alt={`Image for ${article.brand}`}
                      width={100} // Adjust the width according to your design
                      height={100} // Adjust the height according to your design
                      className='cursor-pointer overflow-hidden w-full h-full object-cover rounded'
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-left justify-center cursor-default bg-red z-50">
                  <div className="des pl-4 bg-background">
                    <span className="text-muted-foreground">{article.brand}</span>
                    <br />
                    <span className="text-primary">{article.price}</span>
                  </div>
                </div>
              </div>

              <div className='flex w-[20%] items-center relative'>
                {/* <Input className='ml-2 w-16' type="number" min="1" defaultValue={Object.values(articleCookie?.[article.id] ?? '1')} onChange={(event) => handleQuantityChange(event, article.id)} /> */}
              </div>

              <div className='flex w-[20%] items-center relative'>
                {/* <span className="ml-4 text-primary">
                  {article.price * (parseInt(articleCookie?.[article.id] ? Object.values(articleCookie[article.id]).toString() : '1') || 1)}
                </span> */}
              </div>
              {/* <div onClick={() => handleRemoveCookie(article.id.toString())} className='flex ease-in-out duration-300 hover:text-red-600 hover:cursor-pointer items-center '><FaRegTrashCan style={{ fontSize: '18px' }} /></div> */}
            </div>
          ))}

        </div>
        <div className='flex flex-col w-1/3 h-60 border mr-4  relative md:sticky md:top-20'>
          <div className='flex w-full justify-between'>
            <span className="p-4">Total</span>
            {/* <span className="p-4 text-primary ">{getTotalPrice()} Dh</span> */}
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