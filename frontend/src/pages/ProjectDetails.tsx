import useGetProjectById from "../hooks/useGetProjectById";
import Section from "../components/Section";
import { Stack, Typography, Button, Box, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DetailSection from "../components/DetailSection";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const { project } = useGetProjectById(id);

  return (
    <Stack>
      <Section>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            sx={{ fontSize: 12, width: "fit-content", gap: 2 }}
            LinkComponent={"a"}
            href="/"
          >
            <Tooltip title="Back to Dashboard">
              <ArrowBackIcon />
            </Tooltip>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              Back to Dashboard
            </Box>
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: 12,
              width: "fit-content",
              gap: 2,
              bgcolor: "rgba(227, 45, 0, 1)",
            }}
            LinkComponent={"a"}
            href="/"
          >
            <Tooltip title="Delete Project">
              <DeleteOutlineIcon />
            </Tooltip>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              Delete Project
            </Box>
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
      <Section>
        <DetailSection
          title="Project Details"
          data={[
            { title: "Project ID", text: project?.project_id },
            {
              title: "Next Required Action",
              text: project?.project_next_required_action,
            },
            { title: "Current Stage", text: project?.current_stage_name },
            { title: "Date Created", text: project?.project_creation_date },
            { title: "Team Lead", text: project?.project_team_lead },
            { title: "Lead Department", text: "NEED TO ADD THIS" },
            { title: "Contact Email", text: "NEED TO ADD THIS" },
            { title: "Contact Phone", text: "NEED TO ADD THIS" },
          ]}
        />
      </Section>
      <Section>
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <Stack sx={{ gap: 5 }}>
            <DetailSection
              title="Supplier Details"
              data={[
                { title: "Company", text: "NEED TO ADD THIS" },
                { title: "Point of Contact", text: "NEED TO ADD THIS" },
                { title: "Contact Email", text: "NEED TO ADD THIS" },
                { title: "Contact Phone", text: "NEED TO ADD THIS" },
                {
                  title: "Outstanding Requests",
                  text: "NEED TO ADD THIS",
                },
              ]}
            />
          </Stack>
          <Stack sx={{ gap: 5 }}>
            <DetailSection
              title="Distributor Details"
              data={[
                { title: "Company", text: "NEED TO ADD THIS" },
                { title: "Point of Contact", text: "NEED TO ADD THIS" },
                { title: "Contact Email", text: "NEED TO ADD THIS" },
                { title: "Contact Phone", text: "NEED TO ADD THIS" },
                {
                  title: "Outstanding Requests",
                  text: "NEED TO ADD THIS",
                },
              ]}
            />
          </Stack>
        </Stack>
      </Section>
    </Stack>
  );
};

export default ProjectDetails;
