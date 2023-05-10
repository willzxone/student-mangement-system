import Container from "@mui/material/Container";
import Table from "./MainTable";
import UpperBar from "./UpperBar";

export default function mainComponent(props) {
  return (
    <>
      <Container maxWidth="100%">
        <UpperBar />
        <Table data={props.data} />
      </Container>
    </>
  );
}
