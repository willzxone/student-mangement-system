import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { authActions } from "../../../store/slices/AuthSlice";
import { mainContentActions } from "../../../store/slices/MainContentSlice";
import { sideBarActions } from "../../../store/slices/SideBarSlice";
import { useSelector, useDispatch } from "react-redux";
import { addFormActions } from "../../../store/slices/AddFormSlice";
import Card from "../../UI/Card";

const UpperBar = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const onLogoutHandler = (event) => {
    event.preventDefault();
    if (isLoggedIn) dispatch(authActions.toggleLogin());
    dispatch(authActions.setUserName({ username: "std-" }));
    dispatch(authActions.setPassword({ password: "" }));
    dispatch(mainContentActions.setInitialState());
    dispatch(sideBarActions.setInitialState());
    dispatch(addFormActions.setInitialState(""));
  };

  return (
    <Toolbar style={style}>
      <Card>
        <IconButton>
          <LockOpenSharpIcon style={iconStyle} />
        </IconButton>
        <Typography style={pStyle} variant="p" noWrap component="div">
          {props.username.toUpperCase()}
        </Typography>
      </Card>
      <Card>
        <Button
          onClick={onLogoutHandler}
          size="small"
          style={btnStyle}
          variant="outlined"
        >
          LOGOUT
        </Button>
      </Card>
    </Toolbar>
  );
};

const style = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#2A284B",
};

const btnStyle = {
  color: "white",
  fontWeight: "100",
  borderColor: "grey",
};

const pStyle = { color: "white", fontSize: "1.3rem", fontWeight: "100" };

const iconStyle = { color: "white" };

export default UpperBar;
