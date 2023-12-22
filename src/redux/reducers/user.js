import { createSlice } from "@reduxjs/toolkit";
//import { deleteOfStorage, getOfStorage, saveInStorage } from "../../utils/localStorage";

const user = createSlice({
  name: "user",
  initialState: {
    email: null,
    id: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { email, id } = action.payload;
      return {
        ...state,
        email,
        id,
      };
    },
  },
});

export const userRdr = user.reducer;
export const { setUser } = user.actions;
