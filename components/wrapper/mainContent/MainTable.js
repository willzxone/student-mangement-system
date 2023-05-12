import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import TableRows from "./TableContent/TableRows";
import TableColumns from "./TableContent/TableColumns";

const tableContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  marginTop: "20%",
};

const inputStyle = {
  color: "#333",
  marginBottom: "0.5rem",
};

const MainTable = (props) => {
  return props.data ? (
    <TableContainer style={tableContainerStyle} component={Paper}>
      <TextField
        style={inputStyle}
        id="standard-basic"
        label="CLASS ID"
        variant="standard"
      />
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          {(() => {
            if (typeof props.data.metaData !== "undefined") {
              return <TableColumns metaData={props.data.metaData} />;
            } else {
              return <p>...LOADING</p>;
            }
          })()}
        </TableHead>
        <TableBody>
          {(() => {
            if (typeof props.data.metaData !== "undefined") {
              return <TableRows rows={props.data.rows} />;
            } else {
              return <p>...LOADING</p>;
            }
          })()}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <p>NO DATA FOUND</p>
  );
};

export default MainTable;
