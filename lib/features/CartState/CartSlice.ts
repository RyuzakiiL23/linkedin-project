"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cart: boolean
}
const initialState: CartState = {
  cart: true,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartUpdate: (state) => {
      state.cart = !state;
    },
  },
});
// Action creators are generated for each case reducer function
export const { cartUpdate } = CartSlice.actions;
export default CartSlice.reducer;