import { createSlice } from "@reduxjs/toolkit";
import { deleteOfStorage, saveInStorage } from "src/utils/localStorage";

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    cleanUser: () => {
      deleteOfStorage("user");
      return {
        id: null,
        email: null,
        firstSignIn: null,
      };
    },

    setUser: (state, action) => {
      saveInStorage("user", action.payload);

      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const userRdr = user.reducer;
export const { setUser, cleanUser } = user.actions;
