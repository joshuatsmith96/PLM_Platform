import { Typography, TableCell, TableRow, Chip } from "@mui/material";
import type { TableDataType } from "../../../types/TableTypes";

type TRowType = {
  project: TableDataType;
  index: number;
};

const getChipColor = (status: string) => {
  switch (status) {
    case "New Item":
      return { bgcolor: "#2196f3", color: "white" };
    case "Transitioning Item":
      return { bgcolor: "#4caf50", color: "white" };
    case "Deleting Item":
      return { bgcolor: "#f44336", color: "white" };
    default:
      return { bgcolor: "#757575", color: "white" };
  }
};

const TRow = ({ project, index }: TRowType) => {
  return (
    <TableRow
      key={project.id}
      sx={{
        bgcolor: index % 2 === 0 ? "white" : "#fafafa",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
    >
      <TableCell sx={{ color: "#666" }}>{project.id}</TableCell>
      <TableCell>
        <Typography sx={{ color: "#2196f3", fontWeight: 500 }}>
          {project.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={project.criticalStatus}
          size="small"
          sx={{
            ...getChipColor(project.criticalStatus),
            fontWeight: 500,
            borderRadius: 2,
          }}
        />
      </TableCell>
      <TableCell sx={{ color: "#666" }}>{project.status}</TableCell>
      <TableCell sx={{ color: "#666", maxWidth: 250 }}>
        {project.action}
      </TableCell>
      <TableCell sx={{ color: "#666" }}>{project.date}</TableCell>
    </TableRow>
  );
};

export default TRow;
