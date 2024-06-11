'use client'
import Image from "next/image";
import "./category.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the type for your collection data
interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

const CollectionCard: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/categories`);
        const data: Collection[] = await response.json();
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cursor-pointer">
      <div className="flex flex-wrap gap-8 justify-between">
        {collections.map((collection) => (
          <div key={collection.id} className="border rounded w-96">
            <div className="cardUi">
              <Link href={`/categories/${collection.id.toString()}`} className="card1">
                <div className="flex justify-center items-center hover:opacity-50 duration-150 ease-out">
                  <h1 className="text-cyan-400 absolute text-center w-full font-bold text-xl">
                    {collection.name}
                  </h1>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={400}
                    height={100}
                  />
                </div>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
