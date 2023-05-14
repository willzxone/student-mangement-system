import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { addFormActions } from "../../../../store/slices/AddFormSlice";

export const getInputs = (values, dispatch, username) => {
  const inputHandler = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    dispatch(addFormActions.setDetails({ value, name }));
  };
  return values.map((item, index) => {
    let type = "text";
    if (username === "Teacher" || username === "Student")
      switch (index) {
        case 2:
          type = "password";
          break;
        case 4:
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

const inputStyle = {
  backgroundColor: "white",
  width: "100%",
  borderRadius: "5px",
  fontSize: "1.5rem",
};
