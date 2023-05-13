import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  content: undefined,
  showContent: false,
  selectList: undefined,
  selectedList: "",
};

const mainContentSlice = createSlice({
  name: "MainContent",
  initialState,
  reducers: {
    showContent(state, action) {
      state.showContent = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setSelectList(state, action) {
      state.selectList = action.payload;
    },
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    setInitialState(state) {
      state.content = undefined;
      state.showContent = false;
      state.selectList = undefined;
      state.selectedList = "";
    },
  },
});

export const mainContentActions = mainContentSlice.actions;

export default mainContentSlice;
