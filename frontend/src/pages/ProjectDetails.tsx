import { Stack, Typography } from "@mui/material";
import useGetProjectById from "../hooks/useGetProjectById";

const ProjectDetails = () => {
  const { project } = useGetProjectById("P3");

  console.log(project);
  return (
    <Stack>
      <Typography variant="h4">Project Details Page</Typography>
    </Stack>
  );
};

export default ProjectDetails;
