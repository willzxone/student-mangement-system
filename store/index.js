import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import AuthSlice from "./slices/AuthSlice";
import sideBarSlice from "./slices/SideBarSlice";
import mainContentSlice from "./slices/MainContentSlice";
import AddFormSlice from "./slices/AddFormSlice";
// export const store = configureStore({
//   reducer: { auth: AuthSlice.reducer, sidebar: sideBarSlice.reducer },
// });

const makeStore = () =>
  configureStore({
    reducer: {
      auth: AuthSlice.reducer,
      sidebar: sideBarSlice.reducer,
      maincontent: mainContentSlice.reducer,
      addform: AddFormSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
