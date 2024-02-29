import { createSlice } from "@reduxjs/toolkit";
import { deleteOfStorage, saveInStorage } from "src/utils/localStorage";

const auth = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
  },
  reducers: {
    cleanAuth: () => {
      deleteOfStorage("access_token");
      return {
        access_token: "",
      };
    },
    setAccessToken: (state, action) => {
      saveInStorage("access_token", action.payload);
      state.access_token = action.payload;
    },
  },
});

export const authRdr = auth.reducer;
export const { setAccessToken, cleanAuth } = auth.actions;
