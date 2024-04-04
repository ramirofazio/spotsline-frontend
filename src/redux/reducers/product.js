import { createSlice } from "@reduxjs/toolkit";
//import { deleteOfStorage, getOfStorage, saveInStorage } from "../../utils/localStorage";

const initialFilters = {
  orderBy: "",
  category: "",
  colors: [],
};

const product = createSlice({
  name: "product",
  initialState: {
    products: {},
    search: "",
    filters: initialFilters,
    totalPages: 0,
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
    setFilters: function (state, action) {
      return {
        ...state,
        filters: action.payload,
      };
    },
    resetFilters: function (state) {
      return {
        ...state,
        filters: initialFilters,
      };
    },
  },
});

export const productRdr = product.reducer;
export const { setPageProducts, setSearch, resetPageProducts, setTotalPages, setFilters, resetFilters } =
  product.actions;
