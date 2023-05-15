import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "../../UI/Button";

import { sideBarActions } from "../../../store/slices/SideBarSlice";
import { mainContentActions } from "../../../store/slices/MainContentSlice";
import { useSelector, useDispatch } from "react-redux";
import { showMainContent } from "../../../store/actions/MainContentAction";
import { RequestForApi } from "./RequestForApi";
import { addFormActions } from "../../../store/slices/AddFormSlice";

const query = (button) => {
  switch (button.toLowerCase()) {
    case "view class":
      return "BEGIN GET_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "view scheduled classes":
      return "BEGIN GET_SCHEDULED_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "view attendance":
      return "BEGIN GET_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "view details":
    case "enroll class":
      return "BEGIN GET_CLASSES(:cursor); END;";
    case "add attendance":
    case "view student attendance":
    case "view students":
      return "BEGIN GET_CLASSES_SPECFIC_TCH(:username,:cursor); END;";
    case "add student":
    case "add teacher":
      return "ADD USER";
    case "edit teacher":
    case "edit student":
      return "EDIT USER";
    case "create class":
    case "schedule class":
      return "ADD CLASS";
    default:
      return "";
  }
};

const LowerBar = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const onClickHandler = (event) => {
    event.preventDefault();
    if (
      event.target.textContent === "View Attendance" ||
      event.target.textContent === "View Details" ||
      event.target.textContent === "Add Attendance"
    )
      dispatch(mainContentActions.setSelectedList(""));

    //Setting which button is clicked
    dispatch(mainContentActions.setContent(undefined));
    dispatch(addFormActions.setInitialState(""));
    dispatch(addFormActions.setUserDetailButtonData(""));
    dispatch(sideBarActions.setButtonKey(event.target.textContent));
    dispatch(mainContentActions.setSelectedList(""));

    //Dispatching Action To Get Data From DB Respective To That Button
    const queryDetails = query(event.target.textContent);
    if (queryDetails.length > 20) {
      dispatch(
        showMainContent(
          RequestForApi(
            queryDetails,
            event.target.textContent === "View Details" ||
              event.target.textContent === "Enroll Class"
              ? { cursor: "" }
              : { username },
            true
          ),
          event.target.textContent
        )
      );
    } else if (
      queryDetails === "ADD USER" ||
      queryDetails === "EDIT USER" ||
      queryDetails === "ADD CLASS" ||
      queryDetails === "VIEW CLASS"
    ) {
      dispatch(mainContentActions.showContent(true));
      if (queryDetails === "EDIT USER")
        dispatch(addFormActions.setShowUserDetailButton(true));
      else dispatch(addFormActions.setShowUserDetailButton(false));
    } else dispatch(mainContentActions.showContent(true));
  };

  return (
    <List style={style}>
      {props.buttons.map((text) => (
        <ListItem onClick={onClickHandler} style={itemStyle} key={text}>
          <Button style={btnStyle}>{text}</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default LowerBar;

const style = {
  display: "flex",
  backgroundColor: "#090622",
  color: "#FFFFFF",
  height: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

const itemStyle = {
  justifyContent: "center",
};

const btnStyle = {
  backgroundColor: "red",
  marginBottom: "0.2rem",
  width: "90%",
  fontSize: "0.8rem",
  textTransform: "none",
  fontWeight: "100",
  boxShadow: "none",
  border: "1px solid grey",
};
