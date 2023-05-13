import { createSlice } from "@reduxjs/toolkit";

const AddFormSlice = createSlice({
  name: "Auth",
  initialState: {
    firstname: "",
    lastname: "",
    bloodgroup: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    password: "",
  },
  reducers: {
    setFirstName(state, action) {
      state.firstname = action.payload;
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

    // setFirstName(state, action) {
    //   state.firstname = action.payload;
    // },
    // setLastName(state, action) {
    //   state.lastname = action.payload;
    // },
    // setBloodGroup(state, action) {
    //   state.bloodgroup = action.payload;
    // },
    // setGender(state, action) {
    //   state.gender = action.payload;
    // },
    // setContact(state, action) {
    //   state.contact = action.payload;
    // },
    // setEmail(state, action) {
    //   state.email = action.payload;
    // },
    // setAddress(state, action) {
    //   state.address = action.payload;
    // },
    // setPassword(state, action) {
    //   state.password = action.payload;
    // },
  },
});

export const addFormActions = AddFormSlice.actions;

export default AddFormSlice;
