import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState: {
    buttonKey: "",
  },
  reducers: {
    setButtonKey(state, action) {
      state.buttonKey = action.payload;
    },
    setInitialState(state) {
      state.buttonKey = "";
    },
  },
});

export const sideBarActions = sideBarSlice.actions;

export default sideBarSlice;
