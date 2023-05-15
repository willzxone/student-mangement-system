export const getUserName = (username) => {
  switch (username.toLowerCase().substring(0, 4)) {
    case "std-":
      return "STUDENT";
    case "adm-":
      return "ADMIN";
    case "tch-":
      return "TEACHER";
  }
};
