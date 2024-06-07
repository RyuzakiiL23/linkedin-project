import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";

export default function DeliveryDetails() {
  const details = [
    {
      title: "Free Shipping",
      description: "Free shipping on all order",
      icon: <TbTruckDelivery className="text-primary text-4xl"/>,
    },
    {
      title: "Support 24/7",
      description: "We support 24 hours a day",
      icon: <BiSupport className="text-primary text-4xl"/>,
    },
    {
      title: "Money Return",
      description: "30 days money return",
      icon: <MdOutlinePayment className="text-primary text-4xl"/>,
    },
    {
      title: "Order Tracking",
      description: "Track your order",
      icon: <FaHandHoldingHeart className="text-primary text-4xl"/>,
    },
  ];
  return (
    <div className="p-20 lg:w-[1400px] flex justify-around mx-auto">
      {details.map((detail) => (
        <div
          key={detail.title}
          className="flex gap-4 justify-between items-start"
        >
          <div className="flex gap-4 items-center">
            {detail.icon}
            <div>
              <h3 className="text-md font-bold text-primary">{detail.title}</h3>
              <p className="text-muted-foreground text-sm">{detail.description}</p>
            </div>
          </div>
        </div>
      )
        )}
    </div>
  );
}
