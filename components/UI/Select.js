import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { RequestForApi } from "../wrapper/sideBar/RequestForApi";
import { showMainContent } from "../../store/actions/MainContentAction";
import { mainContentActions } from "../../store/slices/MainContentSlice";

const SelectComponent = (props) => {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.maincontent.selectList);
  const username = useSelector((state) => state.auth.username);
  const selectedClass = useSelector((state) => state.maincontent.selectedList);
  const handleSelect = (event) => {
    dispatch(mainContentActions.setSelectedList(event.target.value));
    dispatch(
      showMainContent(
        RequestForApi(props.query, { username, classid: event.target.value }),
        event.target.value
      )
    );
  };

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
        {classList ? (
          classList.rows.map((item, index) => (
            <MenuItem key={item[0]} value={item[0]}>
              {item[1]}
            </MenuItem>
          ))
        ) : (
          <MenuItem>NO CLASS FOUND</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

const inputStyle = {
  color: "#333",
  marginBottom: "0.5rem",
  width: "18%",
};

export default SelectComponent;
