import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    username: "std-",
    password: "",
    isLoggedIn: false, //change it back to false
    errorMessage: false,
  },
  reducers: {
    setUserName(state, action) {
      state.username = action.payload.username;
    },
    setPassword(state, action) {
      state.password = action.payload.password;
    },
    toggleLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice;
