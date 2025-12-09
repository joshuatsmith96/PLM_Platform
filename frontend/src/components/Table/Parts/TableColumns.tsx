import { TableRow, TableCell } from "@mui/material";

const TableColumns = () => {
  return (
    <TableRow sx={{ bgcolor: "#fafafa" }}>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>Project ID</TableCell>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>
        Project Name
      </TableCell>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>
        Lifecycle Type
      </TableCell>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>
        Critical Status
      </TableCell>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>
        Next Required Action
      </TableCell>
      <TableCell sx={{ fontWeight: 600, color: "#666" }}>
        Date Created
      </TableCell>
    </TableRow>
  );
};

export default TableColumns;
