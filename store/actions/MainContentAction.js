import { mainContentActions } from "../slices/MainContentSlice";
import { sendRequest } from "./SendRequest";
export const showMainContent = (request, buttonKey) => {
  return async (dispatch) => {
    const showContentDispatcher = (result, isShowContent) => {
      //SETTING DATA FROM DB TO OUR MAIN CONTENT STATE
      if (buttonKey === "View Attendance") {
        dispatch(mainContentActions.setSelectList(result));
        dispatch(mainContentActions.showContent(false));
      } else {
        dispatch(mainContentActions.setContent(result));
        dispatch(mainContentActions.showContent(isShowContent));
      }
    };
    try {
      const result = await sendRequest({
        method: request.method,
        body: {
          query: request.query,
          details: request.details,
        },
      });
      showContentDispatcher(result, true);
    } catch (error) {
      console.log(error);
      showContentDispatcher(undefined, false);
    }
  };
};
