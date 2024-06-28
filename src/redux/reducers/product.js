import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
  order: "",
  category: "",
  colors: [],
};

const product = createSlice({
  name: "product",
  initialState: {
    search: "",
    filters: initialFilters,
    products: {},
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
    research: function (state) {
      return {
        ...state,
        products: {},
        totalPages: 0,
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
      if (state.filters.category !== action.payload.category || state.filters.order !== action.payload.order) {
        return {
          ...state,
          products: {},
          filters: action.payload,
        };
      }
    },
    setCategory: function (state, action) {
      if (state.filters.category !== action.payload) {
        return {
          ...state,
          products: {},
          filters: { ...state.filters, category: action.payload },
        };
      }
    },
    resetFilters: function (state) {
      return {
        ...state,
        products: {},
        filters: initialFilters,
      };
    },
  },
});

export const productRdr = product.reducer;
export const {
  setPageProducts,
  setSearch,
  resetPageProducts,
  setTotalPages,
  setFilters,
  resetFilters,
  setCategory,
  research,
} = product.actions;
