import { createSlice } from "@reduxjs/toolkit";
//import { deleteOfStorage, getOfStorage, saveInStorage } from "../../utils/localStorage";

const product = createSlice({
  name: "product",
  initialState: {
    products: {},
    search: "",
    totalPages: 2,
  },
  reducers: {
    setPageProducts: function (state, action) {
      const { page, products } = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          [page]: products,
        },
      };
    },
    setSearch: function (state, action) {
      return {
        ...state,
        search: action.payload,
      };
    },
    resetPageProducts: function (state) {
      return {
        ...state,
        products: {},
      };
    },
    setTotalPages: function (state, action) {
      return {
        ...state,
        totalPages: action.payload,
      };
    },
  },
});

export const productRdr = product.reducer;
export const { setPageProducts, setSearch, resetPageProducts, setTotalPages } = product.actions;
