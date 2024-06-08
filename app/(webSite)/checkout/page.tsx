'use client'

import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
// import Cookies from 'universal-cookie';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FaCartShopping, FaMoneyCheckDollar, FaRegTrashCan } from 'react-icons/fa6';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Context } from '@/app/layout';
import Image from "next/image";

interface Article {
  name: string;
  id: number;
  brand: string;
  processor: string;
  price: number;
  principalImage: string;
  // Add other properties as needed
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
    Prénom: '',
    Nom: '',
    Adresse: '',
    Code_postal: '',
    Ville: '',
    Téléphone: '',
  });

  const [sheetOpen, setSheetOpen] = useState(false);

//   const { articleCookie, setArticleCookie } = useContext(Context) || {
//     artileCookie: [],
//     setArticleCookie: () => { },
//   };
//   const cookies = new Cookies();

//   useEffect(() => {
//     fetch('http://localhost:8080/articles')
//       .then((response) => response.json())
//       .then((data: Article[]) => {
//         const filteredArticles = data.filter((article) => articleCookie?.[article.id]);
//         const filteredArticlesArray = Object.values(filteredArticles);
//         setArticles(filteredArticlesArray);
//       })
//       .catch((error) => {
//         console.error('Error fetching articles:', error);
//       });
//   }, [count, articleCookie]);

//   const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
//     const item = { [id]: event.target.value.toString() };
//     if (!articleCookie?.[id] || Object.values(item) !== item) {
//       setArticleCookie((prevObject) => {
//         const newArticleCookie = { ...prevObject, [id]: item };
//         return newArticleCookie;
//       });

//       cookies.set(id.toString(), item, {
//         // Add any additional cookie settings if needed
//       });
//     } else {
//       console.log('id already exists in cart and cookies');
//     }
//   };

//   useEffect(() => {
//     const articleCookieValues = Object.values(articleCookie ?? {});
//     setCount(articleCookieValues.length);
//   }, [articleCookie]);

//   const handleRemoveCookie = (val: string) => {
//     cookies.remove(val);

//     setArticleCookie((prevObject) => {
//       const newArticleCookie = { ...prevObject };
//       delete newArticleCookie[val];
//       return newArticleCookie;
//     });

//     setArticles((prevArticles) => prevArticles.filter((article) => article.id.toString() !== val));
//   };

  const articles = [
    {
      id: 1,
      name: "Product 6",
      brand: "SKILLCHAIRS",
      price: 2999,
      image1: "/Chaise1.webp",
      link: "/product/6",
      availability: true,
    },
    {
      id: 1,
      name: "Product 6",
      brand: "SKILLCHAIRS",
      price: 2999,
      image1: "/Chaise2.webp",
      link: "/product/6",
      availability: true,
    },
  ];

  const getTotalPrice = () => {
    return articles.reduce((acc, article) => {
      return acc + article.price;
    }, 0);
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCltDetails({ ...cltDetails, [name]: value });
  };

  return (
    <div className="flex relative h-full mt-10">
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
        <div className='flex w-full justify-between px-20'>
            <span className="p-4">Total</span>
            <span className="p-4 text-primary ">{getTotalPrice()} Dh</span>
          </div>
      </div>
      <div className="w-[40%] mr-10">
        <div className="flex border-b relative">
          <p className="ml-4 w-[64%]">Produit</p>
          <p className="ml-4 w-[18%]">Quanité</p>
          <p className="ml-4 w-[18%]">Total</p>
        </div>
        {articles.map((article) => (
          <div
            className="bg-background flex border-b px-4 relative"
            key={article.id}
          >
            <div className="flex w-[70%] ">
              <div className="w-[30%] h-[150px] flex items-center justify-center cursor-default relative">
                <Link
                  onClick={() => setSheetOpen(false)}
                  className="relative w-full h-2/3"
                  href={`/shop/${article.id}`}
                >
                  <Image
                    src={article.image1}
                    alt={`Image for ${article.brand}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </Link>
              </div>
              <div className="flex flex-col items-left justify-center cursor-default bg-red">
                <div className="pl-4 bg-background">
                  <span className="text-muted-foreground">{article.brand}</span>
                  <br />
                  <span className="text-forground hover:text-ring cursor-pointer ">
                    {article.name}
                  </span>
                  <br />
                  <span className="text-primary">{article.price}</span>
                </div>
              </div>
            </div>

            {/* <div className="flex w-[15%] items-center relative">
            <Input className='ml-2 w-16' type="number" min="1" defaultValue={Object.values(articleCookie?.[article.id] ?? '1')} onChange={(event) => handleQuantityChange(event, article.id)} />
            </div>

            <div className="flex w-[15%] items-center relative">
              <span className="ml-4 text-primary"> {article.price * (parseInt(articleCookie?.[article.id] ? Object.values(articleCookie[article.id]).toString() : '1') || 1)}</span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
