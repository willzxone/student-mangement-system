import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TypoGraphy from "./../../UI/Typography";

const drawerWidth = 350;
const toolBarStyle = {
  justifyContent: "center",
  background:
    "linear-gradient(90deg, rgba(35,40,154,1) 0%, rgba(142,1,191,1) 32%, rgba(166,53,111,1) 71%, rgba(54,14,57,1) 100%)",
};

const UpperBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar style={toolBarStyle}>
        <TypoGraphy text={"ADMIN PORTAL"} />
      </Toolbar>
    </AppBar>
  );
};

export default UpperBar;
