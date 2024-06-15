'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/fetchFolder/fetchCategories";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function BestProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          setCategories(data);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (error) {
        setError("An error occurred while fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-10 lg:w-[1400px] mx-auto">
      <h2 className="flex font-bold h-full justify-center items-center text-primary text-4xl p-10">
        Best Categories
      </h2>
      <div className="flex gap-20 justify-between">
        {categories.slice(0, 3).map((category) => (
          <div
            key={category.id}
            className="w-[400px] h-[270px] p-8 bg-border relative overflow-hidden group cursor-default"
          >
            <h4 className="font-bold text-xl pb-2 text-muted-foreground">
              {category.name}
            </h4>
            <p className="relative text-muted-foreground z-40">{category.description}</p>
            <Link href={`/categories/${category.id}`}>
              <button className="mt-4 bg-primary text-white py-2 font-semibold px-4">
                voir plus
              </button>
            </Link>
            <Image
              src={category.image}
              alt={category.name}
              width={240}
              height={68}
                style={{ height: "auto", width: "auto" }}
              className="absolute bottom-[-40px] right-[-20px] group-hover:bottom-[-20px] z-30 transition-all duration-500 ease-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
