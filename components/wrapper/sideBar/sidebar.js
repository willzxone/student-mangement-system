import UpperBar from "./UpperBar";
import Drawer from "../../UI/Drawer";

import Divider from "../../UI/Divider";
import LowerBar from "./LowerBar";

export default function sidebar() {
  return (
    <Drawer>
      <UpperBar />
      <LowerBar buttons={["View Attendance", "View Class"]} />
      <Divider />
    </Drawer>
  );
}
