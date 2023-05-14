import * as React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/AuthSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarComponent = (props) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={props.data.handleClose}
    >
      <Alert
        onClose={props.data.handleClose}
        severity={props.data.alert}
        sx={{ width: "100%" }}
      >
        {props.data.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
