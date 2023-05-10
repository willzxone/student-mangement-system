import Drawer from "@mui/material/Drawer";

const drawerWidth = 350;
const DrawerComponent = (props) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {props.children}
    </Drawer>
  );
};

export default DrawerComponent;
