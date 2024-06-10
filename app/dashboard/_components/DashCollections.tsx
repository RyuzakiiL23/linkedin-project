'use client'
import React, { useEffect, useState } from "react";
import CategoryDialog from "./Collections/CategoryDialog";
import Cookies from "universal-cookie";
import Image from "next/image";

export default function DashCollections() {
  const cookies = new Cookies(null, { path: '/' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  const autorisation = cookies.get("session");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/categories`, {
          method: "GET",
          credentials: "include",
          headers: {
            // 'Authorization': `Bearer ${cookies.get("api_token")}`,
          },
        });
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [deleteState, dialogOpen]);

  return (
    <div className="h-full m-8">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[20%]">name</div>
        {/* <div className="p-2 w-[10%]">status</div> */}
        <div className="p-2 w-[40%]">description</div>
        <div className="p-2 w-[5%]">...</div>
      </div>
      {Array.isArray(collections) &&
        collections.map((item: any) => (
          <div
            key={item.id}
            className="flex relative items-center justify-between h-16"
          >
            <div className="p-2 w-[10%]">
              <Image src={item.image} width="50" height="50" alt={item.name} />
              </div>
            <div className="p-2 w-[20%]">{item.name}</div>
            {/* <div className="p-2 w-[10%]">{item.status}</div> */}
            <div className="p-2 w-[40%]">{item.description}</div>
            <div onClick={() => setDialogOpen(true)} className="p-2 w-[5%]">
              <CategoryDialog
                category={item.name}
                categoryId={item.id}
                setDeleteState={setDeleteState}
                deleteState={deleteState}
                setDialogOpen={setDialogOpen}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
