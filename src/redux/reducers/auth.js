import { createSlice } from "@reduxjs/toolkit";
//import { deleteOfStorage, getOfStorage, saveInStorage } from "../../utils/localStorage";

const auth = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      if (action.payload) state.token = action.payload;
    },
  },
});

export const authRdr = auth.reducer;
export const { setToken } = auth.actions;
