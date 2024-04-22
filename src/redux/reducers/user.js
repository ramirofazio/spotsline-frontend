import { createSlice } from "@reduxjs/toolkit";
import { deleteOfStorage, saveInStorage } from "src/utils/localStorage";

const user = createSlice({
  name: "user",
  initialState: {
    email: "",
    firstSignIn: "",
    id: "",
    web_role: "",
  },
  reducers: {
    cleanUser: () => {
      deleteOfStorage("user");
      return {};
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
