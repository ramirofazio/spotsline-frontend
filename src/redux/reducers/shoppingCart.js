import { createSlice } from "@reduxjs/toolkit";
import { deleteOfStorage, saveInStorage } from "src/utils/localStorage";

const initialState = {
  id: false,
  items: [],
  discount: 0,
  total: 0,
  subtotal: 0,
  coupon: false,
  userId: 0,
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
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.items.push(newItem);
      }

      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);

      saveInStorage("shoppingCart", state);
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id ?? item.productId !== itemId);
      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;

      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id ?? item.productId !== id);
      }

      const updatedItems = state.items.map((item) => {
        if (item.id ?? item.productId === id) {
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
      const coupon = action.payload;

      state.discount = coupon.discountPercentaje;
      state.coupon = coupon;

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    removeDiscount(state) {
      state.discount = 0;
      state.coupon = false;

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },

    clearCart(state) {
      deleteOfStorage("shoppingCart");
      return { id: state.id, items: [], discount: 0, total: 0, subtotal: 0, coupon: false };
    },
    loadCart(state, action) {
      saveInStorage("shoppingCart", action.payload);
      state.id = action.payload.id || null;
      state.items = action.payload.items || [];
      state.subtotal = calculateSubtotal(state.items);
      state.discount = action.payload.discount || 0;
      state.total = calculateTotal(state.subtotal, state.discount);
      state.coupon = action.payload.coupon;
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
