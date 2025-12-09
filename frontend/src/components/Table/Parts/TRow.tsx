import { Typography, TableCell, TableRow, Chip } from "@mui/material";
import type { Project } from "../../../types/DataTypes";

type TRowType = {
  project: Project;
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
      key={project.project_id}
      sx={{
        bgcolor: index % 2 === 0 ? "white" : "#fafafa",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
    >
      <TableCell sx={{ color: "#666" }}>{project.project_id}</TableCell>
      <TableCell>
        <Typography sx={{ color: "#2196f3", fontWeight: 500 }}>
          {project.project_name}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={project.project_critical_status}
          size="small"
          sx={{
            ...getChipColor("Deleting Item"),
            fontWeight: 500,
            borderRadius: 2,
          }}
        />
      </TableCell>
      <TableCell sx={{ color: "#666" }}>
        {project.project_stage_status}
      </TableCell>
      <TableCell sx={{ color: "#666", maxWidth: 250 }}>
        {project.project_next_required_action}
      </TableCell>
      <TableCell sx={{ color: "#666" }}>
        {project.project_creation_date}
      </TableCell>
    </TableRow>
  );
};

export default TRow;
