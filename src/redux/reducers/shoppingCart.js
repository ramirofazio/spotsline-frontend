import { createSlice } from "@reduxjs/toolkit";
import { saveInStorage } from "src/utils/localStorage";

const initialState = {
  id: false,
  modified: false,
  items: [],
  discount: 0,
  total: 0,
  subtotal: 0,
  currentCoupon: false,
};

const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
};

export const calculateTotal = (subtotal, discount) => {
  return subtotal * (1 - discount / 100);
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.modified = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    removeItemFromCart(state, action) {
      state.modified = true;
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    updateCartItemQuantity(state, action) {
      state.modified = true;
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, qty: quantity };
        }
        return item;
      });

      state.items = updatedItems;
      state.subtotal = calculateSubtotal(updatedItems);
      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    applyDiscount(state, action) {
      state.modified = true;
      const coupon = action.payload;

      state.discount = state.discount + coupon.discountPercentaje;
      state.currentCoupon = coupon;

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    removeDiscount(state, action) {
      state.modified = true;
      const coupon = action.payload;
      state.discount = state.discount - coupon.discountPercentaje;
      state.currentCoupon = false;

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },

    clearCart(state) {
      state.modified = false;
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.discount = 0;
      state.currentCoupon = false;
      saveInStorage("shoppingCart", state);
    },
    loadCart(state, action) {

      state.id = action.payload.id || null;
      state.items = action.payload.items || [];
      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      state.discount = action.payload.discount || 0;
      state.currentCoupon = action.payload.currentCoupon;
    },
  },
});

export const shoppingCartRdr = shoppingCartSlice.reducer;
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  applyDiscount,
  clearCart,
  loadCart,
  removeDiscount,
} = shoppingCartSlice.actions;
