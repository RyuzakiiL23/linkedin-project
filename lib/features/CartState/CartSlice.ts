"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart:
     [
        {
          id: number;
          quantity: number;
        }
      ]
    | [];
}
const initialState: CartState = {
  cart: [],
};

// helper function to add products to cart and update the cart
function updateCart(cart: any, product: any) {
  if (cart.length === 0) {
    return [product];
  }

  const newCart = cart.map((item: any) => {
    if (item.id === product.id) {
      return {
        ...item,
        quantity: product.quantity,
      };
    }
    return item;
  });
  return newCart;
}

// helper function to remove products from cart
function removeItem(cart: any, product: string) {
  const newCart = cart.filter((item: any) => item.id !== product);
  return newCart;
}

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<object | undefined>) => {
      const newProduct = action.payload;
      state.cart = updateCart(state.cart, newProduct);
    },
    removeProduct: (state, action: PayloadAction<string | undefined>) => {
      const deleteProduct = action.payload;
      state.cart = removeItem(state.cart, deleteProduct || "");
    },
  },
});
// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, } = CartSlice.actions;
export default CartSlice.reducer;
