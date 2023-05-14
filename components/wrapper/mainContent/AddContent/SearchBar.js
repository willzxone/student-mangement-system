import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { RequestForApi } from "../../sideBar/RequestForApi";
import { useDispatch, useSelector } from "react-redux";
import { showMainContent } from "../../../../store/actions/MainContentAction";
import { addFormActions } from "../../../../store/slices/AddFormSlice";

const queryDetails = "BEGIN GET_USER_DETAILS(:id,:username,:cursor); END;";

const SearchBar = (props) => {
  //const [userDetails,setUserDetails] = React.useState

  const dispatch = useDispatch();
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const userDetails = useSelector((state) => state.addform.userDetails);
  const userDetailButtonData = useSelector(
    (state) => state.addform.userDetailButtonData
  );

  let timerId = null;
  const isUserDetailFound = useSelector(
    (state) => state.addform.isUserDetailFound
  );

  const onChangeHandler = (event) => {
    event.preventDefault();

    dispatch(addFormActions.setUserDetailButtonData(event.target.value));

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      dispatch(
        showMainContent(
          RequestForApi(
            queryDetails,
            {
              id: event.target.value,
              username: props.username.toLowerCase(),
            },
            true
          ),
          buttonKey
        )
      );
    }, 1000);
  };

  useEffect(() => {
    if (isUserDetailFound === true && userDetails !== undefined) {
      let value;
      userDetails.metaData.forEach((meta, index) => {
        value = "";
        if (userDetails.rows.length > 0) {
          value = userDetails.rows[0][index];
        }
        const name = meta.name;
        dispatch(addFormActions.setDetails({ value, name }));
      });
    }
  }, [isUserDetailFound, userDetails]);

  return (
    <>
      <Grid onChange={onChangeHandler} xs={4}>
        <TextField
          sx={{ width: "100%" }}
          className="outlined-basic"
          label={`Search ${props.username} With ID`}
          variant="outlined"
          name="ID Search"
          value={userDetailButtonData}
        />
      </Grid>
    </>
  );
};

export default SearchBar;
