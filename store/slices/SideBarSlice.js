import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState: {
    username: "std-",
    password: "",
    isLoggedIn: false,
  },
  reducers: {
    setUserName(state, action) {
      state.username = action.payload.username;
    },
    setPassword(state, action) {
      state.password = action.payload.password;
    },
    toggleLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const sideBarActions = sideBarSlice.actions;

export default sideBarSlice;
