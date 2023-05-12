import * as React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/slices/AuthSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarComponent = (props) => {
  //const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(authActions.setError(false));
  };

  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        USERNAME OR PASSWORD INCORRECT
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
