import StyledTableCell from "./TableCellStyle";
import StyledTableRow from "./TableRowStyle";

const TableRows = (props) => {
  return props.rows.map((row, index) => (
    <StyledTableRow key={row[0] || index}>
      {row.map((column, index) => (
        <StyledTableCell key={column || index}>{column}</StyledTableCell>
      ))}
    </StyledTableRow>
  ));
};

export default TableRows;
