import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/slices/AuthSlice";
import { sendLoginCredentials } from "../../../store/actions/AuthActions";
import SnackBar from "./ErrorSnackBar";

const SignInForm = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const buttonState = useSelector(
    (state) => state.auth.username.length > 6 && state.auth.password.length > 7
  );
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setUserName({ username: event.target.value }));
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setPassword({ password: event.target.value }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(sendLoginCredentials({ username, password }));
  };

  return (
    <form style={formStyle} onSubmit={formSubmitHandler}>
      <TextField
        style={inputStyle}
        className="filled-basic"
        label="Username"
        variant="filled"
        value={username}
        onChange={usernameChangeHandler}
      />
      <TextField
        style={inputStyle}
        type="password"
        className="filled-basic"
        label="Password"
        variant="filled"
        value={password}
        onChange={passwordChangeHandler}
      />
      {buttonState && (
        <Button type="submit" variant="outlined" color="error">
          SIGN IN
        </Button>
      )}
      {errorMessage && <SnackBar />}
    </form>
  );
};

export default SignInForm;

const inputStyle = {
  backgroundColor: "white",
  width: "100%",
  borderRadius: "5px",
  fontSize: "1.5rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  gap: "20px",
};
