import StyledTableCell from "./TableCellStyle";
import TableRow from "@mui/material/TableRow";
const TableColumns = (props) => {
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

{
  /* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
      <StyledTableCell align="right">Calories</StyledTableCell>
      <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
      <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
      <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
      <StyledTableCell align="right">&nbsp;</StyledTableCell> */
}

export default TableColumns;
