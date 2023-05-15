import StyledTableCell from "./TableCellStyle";
import TableRow from "@mui/material/TableRow";
const TableColumns = (props) => {
  console.log("IN TABLE COLUMN");
  return (
    <TableRow>
      {props.metaData.map((column, index) => (
        <StyledTableCell key={column.name || index}>
          {column.name}
        </StyledTableCell>
      ))}
    </TableRow>
  );
};

export default TableColumns;
