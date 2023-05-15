import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { addFormActions } from "../../../../store/slices/AddFormSlice";
import { getInputs } from "./GetInputs";
import SnackBar from "../../../UI/SnackBar";
import SearchBar from "./SearchBar";
import { formSubmitHandler } from "./FormSubmitHandler";
import { useEffect } from "react";

const AddForm = () => {
  const dispatch = useDispatch();
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const isShowButton = useSelector((state) => state.addform.isShowButton);
  const isSubmitted = useSelector((state) => state.addform.isSubmitted);
  const snackBarData = useSelector((state) => state.addform.snackbarMessage);
  const snackBarAlert = useSelector((state) => state.addform.snackbarAlert);
  const isUserDetailButton = useSelector(
    (state) => state.addform.isUserDetailButton
  );
  const userDetailButtonData = useSelector(
    (state) => state.addform.userDetailButtonData
  );

  const username = buttonKey.split(" ")[1];
  const buttonData = buttonKey.split(" ");
  const isShowClassAddForm =
    username === "Class" && buttonKey !== "Schedule Class";

  const isShowScheduleClassForm =
    username === "Class" && buttonKey === "Schedule Class";

  const formDataUser = [
    {
      name: "First Name",
      value: useSelector((state) => state.addform.firstname),
    },
    {
      name: "Last Name",
      value: useSelector((state) => state.addform.lastname),
    },
    { name: "Password", value: useSelector((state) => state.addform.password) },
    { name: "Contact", value: useSelector((state) => state.addform.contact) },
    { name: "Email", value: useSelector((state) => state.addform.email) },
    {
      name: "Bloodgroup",
      value: useSelector((state) => state.addform.bloodgroup),
    },
    { name: "Gender", value: useSelector((state) => state.addform.gender) },
    { name: "Address", value: useSelector((state) => state.addform.address) },
  ];

  const formDataClass = [
    {
      name: "Class Name",
      value: useSelector((state) => state.addform.classname),
    },
    {
      name: "Class Location",
      value: useSelector((state) => state.addform.classlocation),
    },
    {
      name: "Teacher ID",
      value: useSelector((state) => state.addform.teacherid),
    },
  ];

  const formDataClassSchedule = [
    {
      name: "Class ID",
      value: useSelector((state) => state.addform.classid),
    },
    {
      name: "Class Day",
      value: useSelector((state) => state.addform.classDay),
    },
    {
      name: "Class Start Time",
      value: useSelector((state) => state.addform.classStartTime),
    },
    {
      name: "Class End Time",
      value: useSelector((state) => state.addform.classEndTime),
    },
  ];

  useEffect(() => {
    if (isShowScheduleClassForm) {
      if (formDataClassSchedule.every((obj) => obj.value.trim() !== "")) {
        dispatch(addFormActions.setShowButton(true));
      } else dispatch(addFormActions.setShowButton(false));
    }
  }, [formDataClassSchedule, isShowScheduleClassForm]);

  useEffect(() => {
    if (!isShowScheduleClassForm && !isShowClassAddForm)
      if (formDataUser.every((obj) => obj.value.trim() !== "")) {
        dispatch(addFormActions.setShowButton(true));
      } else dispatch(addFormActions.setShowButton(false));
  }, [formDataUser]);

  useEffect(() => {
    if (isShowClassAddForm) {
      if (formDataClass.every((obj) => obj.value.trim() !== "")) {
        dispatch(addFormActions.setShowButton(true));
      } else {
        dispatch(addFormActions.setShowButton(false));
      }
    }
  }, [formDataClass, isShowClassAddForm]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(addFormActions.setSubmitButton(false));
    dispatch(addFormActions.setInitialState(""));
  };

  return (
    <form
      onSubmit={(event) =>
        formSubmitHandler(
          event,
          dispatch,
          buttonKey,
          isShowClassAddForm
            ? formDataClass
            : isShowScheduleClassForm
            ? formDataClassSchedule
            : formDataUser,
          username,
          userDetailButtonData
        )
      }
    >
      <Grid container spacing={2} columns={4} style={formStyle}>
        {!isUserDetailButton && (
          <Grid xs={4}>
            <p style={headingStyle}>{buttonKey.toUpperCase()}</p>
          </Grid>
        )}
        {isUserDetailButton && <SearchBar username={username} />}
        {isShowClassAddForm
          ? getInputs(formDataClass, dispatch, buttonData)
          : isShowScheduleClassForm
          ? getInputs(formDataClassSchedule, dispatch, buttonData)
          : getInputs(formDataUser, dispatch, buttonData)}
        {isShowButton && (
          <Grid display="flex" justifyContent="center" xs={4}>
            <Button
              style={{ width: "50%" }}
              type="submit"
              variant="outlined"
              color="error"
            >
              SUBMIT
            </Button>
          </Grid>
        )}
      </Grid>
      {isSubmitted && (
        <SnackBar
          data={{
            alert: snackBarAlert,
            message: snackBarData,
            handleClose,
          }}
        />
      )}
    </form>
  );
};

export default AddForm;

const headingStyle = {
  textAlign: "center",
  marginTop: "2rem",
  fontSize: "1.2rem",
};

const formStyle = {
  marginTop: "2rem",
};
