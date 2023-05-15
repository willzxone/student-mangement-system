import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { addFormActions } from "../../../../store/slices/AddFormSlice";

export const getInputs = (values, dispatch, buttonKey) => {
  const inputHandler = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    dispatch(addFormActions.setDetails({ value, name }));
  };
  let type;
  return values.map((item, index) => {
    type = "text";
    if (buttonKey[1] === "Teacher" || buttonKey[1] === "Student")
      switch (index) {
        case 2:
          type = "password";
          break;
        case 4:
          type = "email";
          break;
      }
    else if (buttonKey[0] === "Schedule") {
      switch (index) {
        case 2:
        case 3:
          type = "time";
          break;
      }
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
