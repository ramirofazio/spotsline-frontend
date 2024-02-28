import { createSlice } from "@reduxjs/toolkit";
import { saveInStorage } from "src/utils/localStorage";
//import { deleteOfStorage, getOfStorage, saveInStorage } from "../../utils/localStorage";

const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    firstSignIn: null,
  },
  reducers: {
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
export const { setUser } = user.actions;
