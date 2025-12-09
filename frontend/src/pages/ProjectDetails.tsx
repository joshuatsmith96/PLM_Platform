import useGetProjectById from "../hooks/useGetProjectById";
import Section from "../components/Section";
import { Stack, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const { project } = useGetProjectById(id);

  return (
    <Stack>
      <Section>
        <Stack>
          <Button
            variant="outlined"
            sx={{ fontSize: 12, width: "fit-content", gap: 2 }}
            LinkComponent={"a"}
            href="/"
          >
            <ArrowBackIcon />
            Back to Dashboard
          </Button>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Stack
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              justifyContent: "center",
              gap: {
                xs: 1,
                sm: 2,
              },
            }}
          >
            <Typography variant="h6">
              <strong>Project ID:</strong> {project?.project_id}
            </Typography>
            <Typography variant="h6">
              <strong>Project Name:</strong> {project?.project_name}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography>
              <strong>Date Created:</strong> {project?.project_creation_date}
            </Typography>
            <Typography>
              <strong>Critical Status:</strong>{" "}
              {project?.project_critical_status}
            </Typography>
            <Typography>
              <strong>Lifecycle Type:</strong> {project?.project_lifecycle_type}
            </Typography>
          </Stack>
        </Stack>
      </Section>
    </Stack>
  );
};

export default ProjectDetails;
