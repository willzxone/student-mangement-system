import { RequestForApi } from "../../sideBar/RequestForApi";
import { showMainContent } from "../../../../store/actions/MainContentAction";
import { addFormActions } from "../../../../store/slices/AddFormSlice";
export const formSubmitHandler = (
  event,
  dispatch,
  buttonKey,
  formData,
  username,
  userDetailButtonData
) => {
  event.preventDefault();
  const queryDetails = query(buttonKey);
  if (queryDetails !== null)
    dispatch(
      showMainContent(
        RequestForApi(
          queryDetails,
          {
            user_id: userDetailButtonData,
            firstname: formData[0].value,
            lastname: formData[1].value,
            password: formData[2].value,
            contact: formData[3].value,
            email: formData[4].value,
            bloodgroup: formData[5].value,
            gender: formData[6].value,
            address: formData[7].value,
            username: username.toLowerCase(),
          },
          false
        ),
        event.target.textContent
      )
    );
  if (buttonKey.split(" ")[0] === "Edit") {
    dispatch(addFormActions.setSubmitButton(true));
  }
};

const query = (button) => {
  switch (button.toLowerCase()) {
    case "add student":
    case "add teacher":
      return "BEGIN ADD_USER(first_name=> :firstname, last_name=>:lastname, contact=>:contact, blood_group=>:bloodgroup ,address=>:address,email=> :email,gender=>:gender,pass=>:password,table_name=>:username); END;";
    case "edit student":
    case "edit teacher":
      return "BEGIN EDIT_USER(USER_ID => :user_id,first_name=> :firstname, last_name=>:lastname, contact=>:contact, blood_group=>:bloodgroup ,address=>:address,email=> :email,gender=>:gender,pass=>:password,table_name=>:username); END;";
    default:
      return null;
  }
};
