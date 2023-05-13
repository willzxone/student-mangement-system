import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

import TableRows from "./TableRows";
import TableColumns from "./TableColumns";

const MainTable = (props) => {
  return (
    <TableContainer component={Paper}>
      {props.data ? (
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            {(() => {
              if (typeof props.data.metaData !== "undefined") {
                return <TableColumns metaData={props.data.metaData} />;
              }
            })()}
          </TableHead>
          <TableBody>
            {(() => {
              if (typeof props.data.metaData !== "undefined") {
                return <TableRows rows={props.data.rows} />;
              }
            })()}
          </TableBody>
        </Table>
      ) : (
        <p>UNABLE TO RETRIEVE DATA</p>
      )}
    </TableContainer>
  );
};

export default MainTable;
