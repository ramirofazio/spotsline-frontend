import { createSlice } from "@reduxjs/toolkit";
import { saveInStorage } from "src/utils/localStorage";

const auth = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      saveInStorage("access_token", action.payload);
      state.access_token = action.payload;
    },
  },
});

export const authRdr = auth.reducer;
export const { setAccessToken } = auth.actions;
