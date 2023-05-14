import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Table from "./TableContent/MainTable";
import UpperBar from "./UpperBar";
import Select from "../../UI/Select";
import AddForm from "./AddContent/AddForm";

const mainComponent = () => {
  const username = useSelector((state) => state.auth.username);
  const content = useSelector((state) => state.maincontent.content);
  const isShowContent = useSelector((state) => state.maincontent.showContent);
  const portal = useSelector((state) => state.auth.portal);
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  const isButtonShow = showButtonKey.indexOf(buttonKey);

  const showContent = () => {
    switch (portal) {
      case "student":
        return <Table data={content} />;
      case "admin":
        return <AddForm />;
    }
  };

  const query =
    "BEGIN GET_ATTENDACNE_CLASSES_SPECFIC_STD(:username,:classid, :cursor); END;";

  return (
    <>
      <Container maxWidth="100%">
        <UpperBar username={username} />
        <Container style={containerStyle} maxWidth="lg">
          {isButtonShow !== -1 && <Select query={query} />}
          {isShowContent ? (
            showContent()
          ) : (
            <p style={imgStyle}>NO DATA TO SHOW</p>
          )}
        </Container>
      </Container>
    </>
  );
};

export default mainComponent;

const showButtonKey = ["View Attendance", "View Details"];

const imgStyle = {
  textAlign: "center",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
};
