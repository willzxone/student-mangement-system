import UpperBar from "./UpperBar";
import Drawer from "../../UI/Drawer";
import Divider from "../../UI/Divider";
import LowerBar from "./LowerBar";
import { useSelector, useDispatch } from "react-redux";

export default function sidebar() {
  const username = useSelector((state) => state.auth.username);
  return (
    <Drawer>
      <UpperBar username={username} />
      <LowerBar buttons={getButtons(username)} />
      <Divider />
    </Drawer>
  );
}

const getButtons = (username) => {
  switch (username.toLowerCase().substring(0, 4)) {
    case "std-":
      return [
        "View Class",
        "Enroll Class",
        "View Attendance",
        "View Scheduled Classes",
      ];
    case "adm-":
      return [
        "Add Student",
        "Add Teacher",
        "Edit Student",
        "Edit Teacher",
        "Create Class",
        "Schedule Class",
        "View Details",
      ];
    case "tch-":
      return ["Add Attendance", "View Students", "View Student Attendance"];
  }
};
