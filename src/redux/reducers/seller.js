import { createSlice } from "@reduxjs/toolkit";
import { saveInStorage } from "src/utils/localStorage";

const seller = createSlice({
  name: "seller",
  initialState: {
    managedClient: {
      id: "",
      avatar: "",
      fantasyName: "",
      email: "",
      priceList: "",
    },
  },
  reducers: {
    selectClientToManage: (state, action) => {
      saveInStorage("managedClient", action.payload);

      return {
        managedClient: action.payload,
      };
    },
  },
});

export const sellerRdr = seller.reducer;
export const { selectClientToManage } = seller.actions;
