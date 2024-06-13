'use client'

import { useEffect, useState } from "react";
import DashProducts from "./DashProducts";
import DashCollections from "./DashCollections";
import CreateCategory from "./Collections/CreateCategory";
import AddProductDialog from "./Products/AddProductDialog";
import OrdersTable from "./OrdersTable";
// import UserOrders from "./UserOrders"; // Import the component for User Orders

export default function DashboadContainer() {
  const [active, setActive] = useState("collections");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Add any side effects related to dialogOpen if necessary
  }, [dialogOpen]);

  const handleTabClick = (tab: any) => {
    setActive(tab);
  };

  return (
    <div className="h-full">
      <div className="h-10 flex relative border-b items-center">
        <div
          onClick={() => handleTabClick("collections")}
          className={`w-1/3 text-center font-bold cursor-pointer z-40 ${active === "collections" ? "text-gray-200" : "text-primary" }`}
        >
          Collections
        </div>
        <div className="border-r h-full"></div>
        <div
          onClick={() => handleTabClick("products")}
          className={`w-1/3 text-center font-bold cursor-pointer z-40 ${active === "products" ? "text-gray-200" : "text-primary"}`}
        >
          Products
        </div>
        <div className="border-r h-full"></div>
        <div
          onClick={() => handleTabClick("orders")}
          className={`w-1/3 text-center font-bold cursor-pointer z-40 ${active === "orders" ? "text-gray-200" : "text-primary"}`}
        >
          Orders
        </div>
        <div
          className={`absolute h-full w-1/3 bg-primary duration-300 ease-out z-10`}
          style={{
            transform: active === "collections" ? "translateX(0%)" : active === "products" ? "translateX(100%)" : "translateX(200%)",
          }}
        ></div>
      </div>
      <div>
        {active === "collections" ? (
          <div className="h-full">
            <DashCollections collectionDialogOpen={dialogOpen} />
            <CreateCategory dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          </div>
        ) : active === "products" ? (
          <div className="h-full">
            <DashProducts productDialogOpen={dialogOpen} />
            <AddProductDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          </div>
        ) : (
          <div className="h-full">
            <OrdersTable />
          </div>
        )}
      </div>
    </div>
  );
}
