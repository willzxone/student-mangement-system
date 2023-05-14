import { mainContentActions } from "../slices/MainContentSlice";
import { sendRequest } from "./SendRequest";
import { addFormActions } from "../slices/AddFormSlice";

export const showMainContent = (request, buttonKey) => {
  return async (dispatch) => {
    const showContentDispatcher = (result, isShowContent) => {
      //SETTING DATA FROM DB TO OUR MAIN CONTENT STATE
      if (buttonKey === "View Attendance" || buttonKey === "View Details") {
        dispatch(mainContentActions.setSelectList(result));
        dispatch(mainContentActions.showContent(false));
      } else {
        console.log(buttonKey);
        dispatch(mainContentActions.showContent(isShowContent));
        const snackBarData = buttonKey.split(" ");
        dispatch(
          addFormActions.setSnackBarMessage(
            `${snackBarData[1].toUpperCase()} ${snackBarData[0].toUpperCase()}ED SUCCESSFULLY!`
          )
        );
        dispatch(addFormActions.setSnackBarAlert("success"));
        if (buttonKey.split(" ")[0] === "View") {
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
        },
      });
      showContentDispatcher(result, true);
    } catch (error) {
      console.log(error);
      showContentDispatcher(undefined, false);
    }
  };
};
