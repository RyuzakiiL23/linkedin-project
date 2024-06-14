'use client'
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { OrderAccordion } from "./Orders/OrderAccordion";

export default function OrdersTable() {
  const [orders, setOrders] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const cookies = new Cookies();
  const session = cookies.get("session");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.baseURL}/api/orders`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await res.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error if necessary
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="border rounded m-4">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[30%]">User</div>
        <div className="p-2 w-[30%]">Orders</div>
        <div className="p-2 w-[30%]">Articles</div>
        <div className="p-2 w-[10%]">Address</div>
        {/* <div className="p-2 w-[20%]">Product ID</div> */}
      </div>
      {/* {orders.map((order: any) => (
        <div
          key={order.id}
          className="flex relative items-center justify-between h-16"
        >
          <div className="p-2 w-[20%]">{order.transaction_id}</div>
          <div className="p-2 w-[20%]">{order.total_price}</div>
          <div className="p-2 w-[30%]">
            {new Date(order.created_at).toLocaleString()}
          </div>
          <div className="p-2 w-[20%]">{order.product_id}</div>
          <div className="p-2 w-[10%]">{order.user_id}</div>
        </div>
      ))} */}
      <OrderAccordion orders={orders}/>
    </div>
  );
}
