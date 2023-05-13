import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "../../UI/Button";

import { sideBarActions } from "../../../store/slices/SideBarSlice";
import { mainContentActions } from "../../../store/slices/MainContentSlice";
import { useSelector, useDispatch } from "react-redux";
import { showMainContent } from "../../../store/actions/MainContentAction";
import { RequestForApi } from "./RequestForApi";

const query = (button) => {
  switch (button.toLowerCase()) {
    case "view class":
      return "BEGIN GET_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "view scheduled classes":
      return "BEGIN GET_SCHEDULED_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "view attendance":
      return "BEGIN GET_CLASSES_SPECFIC_STD(:username, :cursor); END;";
    case "add student":
    case "add teacher":
    case "edit teacher":
    case "edit student":
      return "Show Content";
    default:
      return null;
  }
};

const LowerBar = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const onClickHandler = (event) => {
    event.preventDefault();
    if (
      event.target.textContent === "View Attendance" ||
      event.target.textContent === "View Details"
    )
      dispatch(mainContentActions.setSelectedList(""));

    //Setting which button is clicked
    dispatch(sideBarActions.setButtonKey(event.target.textContent));
    dispatch(mainContentActions.setContent(undefined));

    //Dispatching Action To Get Data From DB Respective To That Button
    const queryDetails = query(event.target.textContent);
    if (queryDetails !== "Show Content" && queryDetails !== null) {
      console.log("dispacting request: ", queryDetails);
      dispatch(
        showMainContent(
          RequestForApi(queryDetails, { username }, true),
          event.target.textContent
        )
      );
    } else if (queryDetails === "Show Content")
      dispatch(mainContentActions.showContent(true));
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
