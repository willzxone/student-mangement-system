import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MainContent from "../../components/wrapper/mainContent/MainContent";
import SideBar from "../../components/wrapper/sideBar/sidebar";

const Wrapper = (props) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <SideBar />
      <MainContent data={props.props.data} />
    </Box>
  );
};

export default Wrapper;
