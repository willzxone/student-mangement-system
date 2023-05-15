import Table from "@mui/material/Table";
import TableBody, { tableBodyClasses } from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import TableRows from "./TableRows";
import TableColumns from "./TableColumns";

const MainTable = (props) => {
  const portal = useSelector((state) => state.auth.portal);
  const buttonKey = useSelector((state) => state.sidebar.buttonKey);
  let modifiedContent = props.data;

  if (
    buttonKey !== "Enroll Class" &&
    props.data !== undefined &&
    props.data.rows.length > 0 &&
    portal === "teacher" &&
    buttonKey !== "View Student Attendance" &&
    buttonKey !== "View Students"
  ) {
    modifiedContent = JSON.parse(JSON.stringify(props.data));
    modifiedContent.metaData.push({ name: "IS PRESENT" });
    modifiedContent.rows.map((row) => row.push("checkbox"));
  }

  return (
    <TableContainer component={Paper}>
      {modifiedContent ? (
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            {(() => {
              if (typeof modifiedContent.metaData !== "undefined") {
                return <TableColumns metaData={modifiedContent.metaData} />;
              }
            })()}
          </TableHead>
          <TableBody>
            {(() => {
              if (typeof modifiedContent.metaData !== "undefined") {
                return (
                  <TableRows
                    rows={modifiedContent.rows}
                    portal={portal}
                    checkboxesRef={props.checkboxesRef}
                    onCheckHandler={props.onCheckHandler}
                    buttonKey={buttonKey}
                  />
                );
              }
            })()}
          </TableBody>
        </Table>
      ) : (
        <></>
      )}
    </TableContainer>
  );
};

export default MainTable;
