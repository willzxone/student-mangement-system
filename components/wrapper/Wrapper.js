import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import MainContent from "../../components/wrapper/mainContent/MainContent";
import SideBar from "../wrapper/sideBar/sidebar";
import Auth from "./authentication/Authentication";

const Wrapper = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {!isLoggedIn ? (
        <Auth />
      ) : (
        <>
          <SideBar />
          <MainContent data={props.props.data} />
        </>
      )}
    </Box>
  );
};

export default Wrapper;
