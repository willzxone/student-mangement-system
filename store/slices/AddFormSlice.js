import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  bloodgroup: "",
  gender: "",
  contact: "",
  email: "",
  address: "",
  password: "",
  isShowButton: false,
  isSubmitted: false,
  isUserDetailButton: false,
  userDetailButtonData: "",
  isUserDetailFound: false,
  userDetails: undefined,
};

const AddFormSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserDetailButtonData(state, action) {
      state.userDetailButtonData = action.payload;
    },
    setShowButton(state, action) {
      state.isShowButton = action.payload;
    },
    setSubmitButton(state, action) {
      state.isSubmitted = action.payload;
    },
    setUserDetailFound(state, action) {
      state.isUserDetailFound = action.payload;
    },
    setShowUserDetailButton(state, action) {
      state.isUserDetailButton = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },

    setDetails(state, action) {
      switch (action.payload.name) {
        case "First Name":
          state.firstname = action.payload.value;
          break;
        case "Last Name":
          state.lastname = action.payload.value;
          break;
        case "Password":
          state.password = action.payload.value;
          break;
        case "Bloodgroup":
          state.bloodgroup = action.payload.value;
          break;
        case "Gender":
          state.gender = action.payload.value;
          break;
        case "Contact":
          state.contact = action.payload.value;
          break;
        case "Email":
          state.email = action.payload.value;
          break;
        case "Address":
          state.address = action.payload.value;
          break;
      }
    },

    setInitialState(state, action) {
      state.firstname = action.payload;
      state.lastname = action.payload;
      state.password = action.payload;
      state.bloodgroup = action.payload;
      state.gender = action.payload;
      state.contact = action.payload;
      state.email = action.payload;
      state.address = action.payload;
      state.isShowButton = false;
      state.userDetailButtonData = "";
      state.isUserDetailFound = false;
      state.userDetails = undefined;
    },
  },
});

export const addFormActions = AddFormSlice.actions;

export default AddFormSlice;
