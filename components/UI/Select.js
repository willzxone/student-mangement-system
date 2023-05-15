import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { RequestForApi } from "../wrapper/sideBar/RequestForApi";
import { showMainContent } from "../../store/actions/MainContentAction";
import { mainContentActions } from "../../store/slices/MainContentSlice";
import { getUserName } from "../wrapper/mainContent/GetUserName";
import { addFormActions } from "../../store/slices/AddFormSlice";

const getDetails = (portal, event, buttonKey, date) => {
  const user = getUserName(portal);
  if (user === "STUDENT" && buttonKey !== "Enroll Class")
    return { username: portal, classid: event.target.value };
  else if (buttonKey === "View Student Attendance")
    return { classid: event.target.value, date: date };
  else if (buttonKey === "View Students" || buttonKey === "Enroll Class")
    return { classid: event.target.value, username: portal };
  else return { username: event.target.value };
};

const SelectComponent = (props) => {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.maincontent.selectList);
  const username = useSelector((state) => state.auth.username);
  const selectedClass = useSelector((state) => state.maincontent.selectedList);
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const selectedDate = useSelector((state) => state.maincontent.selectedDate);

  let inputStyle = {
    color: "#333",
    marginBottom: "0.5rem",
    width: "18%",
  };

  const handleSelect = (event) => {
    if (classList && classList.rows.length > 0) {
      dispatch(mainContentActions.setSelectedList(event.target.value));
      dispatch(
        showMainContent(
          RequestForApi(
            props.query,
            getDetails(username, event, buttonKey, selectedDate),
            buttonKey === "Enroll Class" ? false : true
          ),
          event.target.value
        )
      );
    }
    if (buttonKey === "Enroll Class") {
      dispatch(
        addFormActions.setSnackBarMessage("CLASS ENROLLED SUCCESSFULLY!")
      );
      dispatch(addFormActions.setSnackBarAlert("success"));
    }
  };

  if (buttonKey === "Enroll Class") {
    inputStyle.width = "100%";
  }
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Class</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedClass}
        label="Class"
        style={inputStyle}
        onChange={handleSelect}
      >
        {classList && classList.rows.length > 0 ? (
          classList.rows.map((item, index) => (
            <MenuItem key={item[0]} value={item[0]}>
              {item[1]}
            </MenuItem>
          ))
        ) : (
          <MenuItem>NO DATA FOUND</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
