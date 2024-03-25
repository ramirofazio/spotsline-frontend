import { createSlice } from "@reduxjs/toolkit";
import { saveInStorage } from "src/utils/localStorage";

const initialState = {
  items: [],
  discount: 0,
  total: 0,
  subtotal: 0,
  currentCoupons: {},
};

const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const calculateTotal = (subtotal, discount) => {
  return subtotal * (1 - discount / 100);
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      //? action.payload = {id: 1234, name: "Articulo Spotsline", img: "....", price: 9999, quantity: 2}
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
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
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

      state.discount = state.discount + coupon.discountPercentaje;
      state.currentCoupons = {
        ...state.currentCoupons,
        [coupon.name]: coupon,
      };

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },
    removeDiscount(state, action) {
      const coupon = action.payload;
      state.discount = state.discount - coupon.discountPercentaje;
      delete state.currentCoupons[coupon.name];
      if (!state.currentCoupons) state.currentCoupons = {};

      state.total = calculateTotal(state.subtotal, state.discount);
      saveInStorage("shoppingCart", state);
    },

    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.discount = 0;
      state.currentCoupons = {};
      saveInStorage("shoppingCart", state);
    },
    loadCart(state, action) {
      state.items = action.payload.items || [];
      state.subtotal = calculateSubtotal(state.items);
      state.total = calculateTotal(state.subtotal, state.discount);
      state.discount = action.payload.discount || 0;
      state.currentCoupons = action.payload.currentCoupons;
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
