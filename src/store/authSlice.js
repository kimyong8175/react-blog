import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      localStorage.setItem("isLoggedIn", "yes");
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      localStorage.removeItem("isLoggedIn");
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
