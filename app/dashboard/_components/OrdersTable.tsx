"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Cookies from "universal-cookie";
import { FaRegTrashCan } from "react-icons/fa6";

interface Address {
  id: number;
  full_name: string;
  street: string;
  city: string;
  province: string;
  country: string;
  zip_code: string;
  phone: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number; // Ensure the Order interface includes an id field
  total_price: number;
  transaction_id: string;
  product_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  address_id: number;
  user_name: string;
  address: Address;
  product_image: string;
}

const OrdersTable: React.FC = () => {
  const cookies = new Cookies();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedUsers, setExpandedUsers] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedTransactions, setExpandedTransactions] = useState<{
    [key: string]: boolean;
  }>({});
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
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const toggleUserAccordion = (userId: number) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const toggleTransactionAccordion = (transactionId: string) => {
    setExpandedTransactions((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const res = await fetch(`${process.env.baseURL}/api/orders/${orderId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
      // Remove the deleted order from state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const groupedByUser = orders.reduce<{
    [key: number]: {
      fullName: string;
      transactions: { [key: string]: Order[] };
    };
  }>((acc, order) => {
    if (!acc[order.user_id]) {
      acc[order.user_id] = {
        fullName: order.address.full_name,
        transactions: {},
      };
    }
    if (!acc[order.user_id].transactions[order.transaction_id]) {
      acc[order.user_id].transactions[order.transaction_id] = [];
    }
    acc[order.user_id].transactions[order.transaction_id].push(order);
    return acc;
  }, {});

  return (
    <div className="border rounded m-4">
      <div className="flex relative items-center justify-between border-b p-2">
        <div className="w-[20%] font-bold">User Name</div>
        <div className="w-[20%] font-bold">Number of Orders</div>
        <div className="w-[20%] font-bold">Number of Articles</div>
        <div className="w-[20%] font-bold">Total Price</div>
        <div className="w-[20%] font-bold">Address</div>
      </div>
      <div className="h-[60vh] overflow-auto">
        {Object.entries(groupedByUser).map(([userId, user]) => {
          const totalOrders = Object.keys(user.transactions).length;
          const totalArticles = Object.values(user.transactions).reduce(
            (sum, orders) => sum + orders.length,
            0
          );
          const totalPrice = Object.values(user.transactions).reduce(
            (sum, orders) =>
              sum +
              orders.reduce(
                (orderSum, order) => orderSum + order.total_price,
                0
              ),
            0
          );
          const address = Object.values(user.transactions)[0][0].address;

          return (
            <div key={userId}>
              <div
                className="flex relative items-center justify-between border-b border-white bg-input p-2 cursor-pointer"
                onClick={() => toggleUserAccordion(Number(userId))}
              >
                <div className="w-[20%]">{user.fullName}</div>
                <div className="w-[20%]">{totalOrders}</div>
                <div className="w-[20%]">{totalArticles}</div>
                <div className="w-[20%]">{totalPrice} dh</div>
                <div className="w-[20%]">
                  <button
                    onClick={() => alert(JSON.stringify(address, null, 2))}
                  >
                    Show Address
                  </button>
                </div>
              </div>
              <div
                className={`transition-all duration-150 ease-out ${
                  expandedUsers[Number(userId)]
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                {Object.entries(user.transactions).map(
                  ([transactionId, transactionOrders]) => {
                    const transactionTotalArticles = transactionOrders.length;
                    const transactionTotalPrice = transactionOrders.reduce(
                      (sum, order) => sum + order.total_price,
                      0
                    );
                    const transactionTimeOfOrder = new Date(
                      transactionOrders[0].created_at
                    ).toLocaleString();

                    return (
                      <div key={transactionId} className="border-primary border-b border-r border-l">
                        <div
                          className="flex relative items-center justify-between border-b p-2 cursor-pointer"
                          onClick={() =>
                            toggleTransactionAccordion(transactionId)
                          }
                        >
                          <div className="w-[40%]">
                            Transaction ID: {transactionId}
                          </div>
                          <div className="w-[20%]">
                            {transactionTotalArticles}
                          </div>
                          <div className="w-[20%]">
                            {transactionTotalPrice} dh
                          </div>
                          <div className="w-[15%]">
                            {transactionTimeOfOrder}
                          </div>
                          <div className="w-[5%]">
                            <FaRegTrashCan
                              className="text-muted-foreground text-end w-full hover:text-destructive duration-150 ease-in-out"
                              onClick={() =>
                                handleDeleteOrder(transactionOrders[0].id)
                              }
                            />
                          </div>
                        </div>
                        <div
                          className={`transition-all duration-150 ease-out ${
                            expandedTransactions[transactionId]
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          } overflow-hidden`}
                        >
                          {expandedTransactions[transactionId] && (
                            <div className="pl-8 bg-background">
                              {/* <div className="flex relative items-center justify-between border-b p-2">
                            <div className="w-[60%]">Image</div>
                            <div className="w-[30%]">Price</div>
                            <div className="w-[10%]">Product ID</div>
                          </div> */}
                              {transactionOrders.map((order) => (
                                <div
                                  key={order.id}
                                  className="flex relative items-center justify-between border-b py-2"
                                >
                                  <div className="w-[58%]">
                                    <Image
                                      src={order.product_image}
                                      alt="Product"
                                      width={44}
                                      height={44}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="w-[35%]">
                                    {order.total_price} dh
                                  </div>
                                  <div className="w-[5%]">
                                    ID: {order.product_id}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTable;
