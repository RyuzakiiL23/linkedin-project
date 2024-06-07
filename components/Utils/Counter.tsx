"use client";
import React from "react";

export default function Counter(props: any) {
  return (
    <div className="flex justify-between items-center w-32 border h-10 relative text-xl font-semibold text-muted-foreground">
      <button
        className={`border  w-10 h-10 ${props.count === 1 ? "opacity-40" : ""}`}
        onClick={() => props.setCount(props.count > 1 ? props.count - 1 : 1)}
      >
        -
      </button>
      <span className="">{props.count}</span>
      <button
        className="border-right h-10 w-10"
        onClick={() => props.setCount(props.count + 1)}
      >
        +
      </button>
    </div>
  );
}
