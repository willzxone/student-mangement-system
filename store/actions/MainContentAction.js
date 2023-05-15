import { mainContentActions } from "../slices/MainContentSlice";
import { sendRequest } from "./SendRequest";
import { addFormActions } from "../slices/AddFormSlice";

export const showMainContent = (request, buttonKey) => {
  return async (dispatch) => {
    const showContentDispatcher = (result, isShowContent) => {
      //SETTING DATA FROM DB TO OUR MAIN CONTENT STATE
      const snackBarData = buttonKey.split(" ");
      if (
        buttonKey === "View Attendance" ||
        buttonKey === "View Details" ||
        buttonKey === "Add Attendance" ||
        buttonKey === "View Student Attendance" ||
        buttonKey === "View Students" ||
        buttonKey === "Enroll Class"
      ) {
        dispatch(mainContentActions.setSelectList(result));
        dispatch(mainContentActions.showContent(false));
      } else {
        dispatch(mainContentActions.showContent(isShowContent));
        snackBarData.length > 1 &&
          dispatch(
            addFormActions.setSnackBarMessage(
              `${snackBarData[1].toUpperCase()} ${snackBarData[0].toUpperCase()}ED SUCCESSFULLY!`
            )
          );
        dispatch(addFormActions.setSnackBarAlert("success"));
        if (buttonKey.split(" ")[0] === "View" || snackBarData.length === 1) {
          dispatch(mainContentActions.setContent(result));
        } else if (buttonKey.split(" ")[0] === "Add") {
          dispatch(addFormActions.setSubmitButton(isShowContent));
        } else if (buttonKey.split(" ")[0] === "Edit") {
          dispatch(addFormActions.setUserDetails(result));
          dispatch(addFormActions.setUserDetailFound(isShowContent));
        }
      }
    };
    try {
      const result = await sendRequest({
        method: request.method,
        body: {
          query: request.query,
          details: request.details,
          isReturn: request.isReturn,
          isTime: request.isTime,
        },
      });
      showContentDispatcher(result, true);
    } catch (error) {
      console.log(error);
      showContentDispatcher(undefined, false);
    }
  };
};
