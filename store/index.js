import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import AuthSlice from "./slices/AuthSlice";
import sideBarSlice from "./slices/SideBarSlice";
// export const store = configureStore({
//   reducer: { auth: AuthSlice.reducer, sidebar: sideBarSlice.reducer },
// });

const makeStore = () =>
  configureStore({
    reducer: { auth: AuthSlice.reducer, sidebar: sideBarSlice.reducer },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
