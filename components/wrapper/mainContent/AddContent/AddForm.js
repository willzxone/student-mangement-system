import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { addFormActions } from "../../../../store/slices/AddFormSlice";
import { RequestForApi } from "../../sideBar/RequestForApi";
import { showMainContent } from "../../../../store/actions/MainContentAction";

const getInputs = (values, dispatch) => {
  const inputHandler = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    dispatch(addFormActions.setDetails({ value, name }));
  };
  return values.map((item, index) => {
    let type = "text";
    switch (index) {
      case 2:
        type = "password";
        break;
      case 6:
        type = "email";
        break;
    }
    return (
      <Grid key={index} xs={4}>
        <TextField
          style={inputStyle}
          className="filled-basic"
          name={item.name}
          key={item.name}
          label={item.name}
          variant="filled"
          type={type}
          value={item.value}
          onChange={inputHandler}
        />
      </Grid>
    );
  });
};

const query = (button) => {
  switch (button.toLowerCase()) {
    case "add student":
    case "add teacher":
      return "BEGIN ADD_USER(first_name=> :firstname, last_name=>:lastname, contact=>:contact, blood_group=>:bloodgroup ,address=>:address,email=> :email,gender=>:gender,pass=>:password,table_name=>:username); END;";
    default:
      return null;
  }
};

const AddForm = () => {
  const dispatch = useDispatch();
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const username = buttonKey.toLowerCase().split(" ")[1];
  const formData = [
    {
      name: "First Name",
      value: useSelector((state) => state.addform.firstname),
    },
    {
      name: "Last Name",
      value: useSelector((state) => state.addform.lastname),
    },
    { name: "Password", value: useSelector((state) => state.addform.password) },
    { name: "Contact", value: useSelector((state) => state.addform.contact) },
    { name: "Email", value: useSelector((state) => state.addform.email) },
    {
      name: "Bloodgroup",
      value: useSelector((state) => state.addform.bloodgroup),
    },
    { name: "Gender", value: useSelector((state) => state.addform.gender) },
    { name: "Address", value: useSelector((state) => state.addform.address) },
  ];

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const queryDetails = query(buttonKey);
    if (queryDetails !== null)
      dispatch(
        showMainContent(
          RequestForApi(
            queryDetails,
            {
              firstname: formData[0].value,
              lastname: formData[1].value,
              password: formData[2].value,
              contact: formData[3].value,
              email: formData[4].value,
              bloodgroup: formData[5].value,
              gender: formData[6].value,
              address: formData[7].value,
              username,
            },
            false
          ),
          event.target.textContent
        )
      );
    console.log(username);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Grid container spacing={2} columns={4} style={formStyle}>
        <Grid xs={4}>
          <p style={headingStyle}>{buttonKey.toUpperCase()}</p>
        </Grid>
        {getInputs(formData, dispatch)}
        {true && (
          <Grid display="flex" justifyContent="center" xs={4}>
            <Button
              style={{ width: "50%" }}
              type="submit"
              variant="outlined"
              color="error"
            >
              SUBMIT
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AddForm;

const inputStyle = {
  backgroundColor: "white",
  width: "100%",
  borderRadius: "5px",
  fontSize: "1.5rem",
};

const headingStyle = {
  textAlign: "center",
  marginTop: "2rem",
  fontSize: "1.2rem",
};

const formStyle = {
  marginTop: "2rem",
};
