import { authActions } from "../slices/AuthSlice";

export const sendLoginCredentials = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          table: getTable(credentials.username),
        }),
      });
      return await response.json();
    };
    const loginDispatcher = (isLogin) => {
      if (isLogin) {
        dispatch(authActions.toggleLogin(true));
        dispatch(authActions.setPortal(getTable(credentials.username)));
      } else dispatch(authActions.toggleLogin(false));
    };

    try {
      const result = await sendRequest();
      if (
        result[0][0] === credentials.username &&
        result[0][1] === credentials.password
      ) {
        loginDispatcher(true);
        dispatch(authActions.setError(false));
      } else loginDispatcher(false);
    } catch (error) {
      dispatch(authActions.setError(true));
      loginDispatcher(false);
    }
  };
};

const getTable = (username) => {
  switch (username.toLowerCase().substring(0, 4)) {
    case "std-":
      return "student";
    case "tch-":
      return "teacher";
    case "adm-":
      return "admin";
  }
};
