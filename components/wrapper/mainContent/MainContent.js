import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Table from "./MainTable";
import UpperBar from "./UpperBar";

export default function mainComponent(props) {
  const username = useSelector((state) => state.auth.username);
  return (
    <>
      <Container maxWidth="100%">
        <UpperBar username={username} />
        <Table data={props.data} />
      </Container>
    </>
  );
}
