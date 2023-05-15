import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Table from "./TableContent/MainTable";
import UpperBar from "./UpperBar";
import Select from "../../UI/Select";
import AddForm from "./AddContent/AddForm";
import AddAttendanceTable from "./AddAttendance/AddAttendance";
import { mainContentActions } from "../../../store/slices/MainContentSlice";
import { addFormActions } from "../../../store/slices/AddFormSlice";
import SnackBar from "../../UI/SnackBar";

const mainComponent = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const content = useSelector((state) => state.maincontent.content);
  const isShowContent = useSelector((state) => state.maincontent.showContent);
  const portal = useSelector((state) => state.auth.portal);
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const selectedDate = useSelector((state) => state.maincontent.selectedDate);
  const isButtonShow = showButtonKey.indexOf(buttonKey);
  const snackBarData = useSelector((state) => state.addform.snackbarMessage);
  const snackBarAlert = useSelector((state) => state.addform.snackbarAlert);

  const showContent = () => {
    switch (portal) {
      case "student":
        return <Table data={content} />;
      case "admin":
        return <AddForm />;
      case "teacher":
        return <AddAttendanceTable data={content} />;
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(addFormActions.setSnackBarMessage(""));
    if (buttonKey === "Enroll Class")
      dispatch(mainContentActions.setSelectedList(""));
  };

  const query = () => {
    if (buttonKey === "Enroll Class")
      return "BEGIN ADD_STD_CLASS(:classid , :username); END;";
    if (portal === "student")
      return "BEGIN GET_ATTENDACNE_CLASSES_SPECFIC_STD(:username,:classid, :cursor); END;";
    else if (buttonKey === "View Student Attendance")
      return "BEGIN VIEW_ATTENDANCE(:classid, TO_DATE(:date, 'YYYY-MM-DD'), :cursor); END;";
    else if (buttonKey === "View Students")
      return "BEGIN GET_CLASSES_DETAIL_TCH(:classid , :username, :cursor); END;";
    else if (portal === "admin" || portal === "teacher")
      return "BEGIN GET_CLASSES_STD_DETAIL(:username, :cursor); END;";
  };

  const dateChangeHandler = (event) => {
    event.preventDefault();
    dispatch(mainContentActions.setSelectDate(event.target.value));
  };

  return (
    <>
      <Container maxWidth="100%">
        <UpperBar username={username} />
        <Container style={containerStyle} maxWidth="lg">
          {isButtonShow !== -1 ? (
            <Select query={query()} />
          ) : (
            (buttonKey === "Add Attendance" ||
              buttonKey === "View Student Attendance" ||
              buttonKey === "View Students") && (
              <div style={searchDateStyle}>
                <Select query={query()} />

                {buttonKey !== "View Students" && (
                  <TextField
                    className="filled-basic"
                    name="Attendance Date"
                    label="Attendance Date"
                    variant="filled"
                    type="date"
                    value={selectedDate}
                    onChange={dateChangeHandler}
                  />
                )}
              </div>
            )
          )}
          {isShowContent && buttonKey !== "Enroll Class" ? (
            isButtonShow !== -1 ? (
              <Table data={content} />
            ) : (
              <>
                {showContent()}
                {snackBarData === "ATTENDANCE SUBMITED SUCCESSFULLY!" && (
                  <SnackBar
                    data={{
                      alert: snackBarAlert,
                      message: snackBarData,
                      handleClose,
                    }}
                  />
                )}
              </>
            )
          ) : snackBarData === "CLASS ENROLLED SUCCESSFULLY!" ? (
            <SnackBar
              data={{
                alert: snackBarAlert,
                message: snackBarData,
                handleClose,
              }}
            />
          ) : (
            <p style={imgStyle}>NO DATA TO SHOW</p>
          )}
        </Container>
      </Container>
    </>
  );
};

export default mainComponent;

const showButtonKey = ["View Attendance", "View Details", "Enroll Class"];

const imgStyle = {
  textAlign: "center",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
};

const searchDateStyle = {
  display: "flex",
  justifyContent: "space-between",
};

// {snackBarData === "CLASS ENROLLED SUCCESSFULLY!" && (
//   <SnackBar
//     data={{
//       alert: snackBarAlert,
//       message: snackBarData,
//       handleClose,
//     }}
//   />
// )}
