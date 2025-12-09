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
            { title: "Project ID", text: "#PRJ-2023-001" },
            {
              title: "Next Required Action",
              text: "Review Supplier Design Proposal",
            },
            { title: "Current Stage", text: "Planning" },
            { title: "Date Created", text: "2025-08-01" },
            { title: "Team Lead", text: "Josh Smith" },
            { title: "Lead Department", text: "Marketing" },
            { title: "Contact Email", text: "josh.smith@email.com" },
            { title: "Contact Phone", text: "123-456-7890" },
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
                { title: "Company", text: "Company A" },
                { title: "Point of Contact", text: "Bob Johnson" },
                { title: "Contact Email", text: "bob.johnson@companyA.com" },
                { title: "Contact Phone", text: "+1-763-123-4567" },
                {
                  title: "Outstanding Requests",
                  text: "Input on notes required",
                },
              ]}
            />
          </Stack>
          <Stack sx={{ gap: 5 }}>
            <DetailSection
              title="Distributor Details"
              data={[
                { title: "Company", text: "Distributor A" },
                { title: "Point of Contact", text: "Bill Smith" },
                { title: "Contact Email", text: "bill.smith@distributorA.com" },
                { title: "Contact Phone", text: "+1-763-456-7890" },
                {
                  title: "Outstanding Requests",
                  text: "Input on images required",
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
