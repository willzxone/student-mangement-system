import StyledTableCell from "./TableCellStyle";
import StyledTableRow from "./TableRowStyle";

const TableRows = (props) => {
  return props.rows.map((row, rowindex) => (
    <StyledTableRow key={rowindex}>
      {row.map((column, index) => (
        <StyledTableCell key={column || index}>
          {index !== 2 || props.portal !== "teacher" ? (
            column
          ) : (
            <input
              type="checkbox"
              key={row[0] || index}
              name={row[0]}
              ref={(el) => (props.checkboxesRef.current[rowindex] = el)}
              onChange={() => props.onCheckHandler(rowindex)}
            />
          )}
        </StyledTableCell>
      ))}
    </StyledTableRow>
  ));
};

export default TableRows;
