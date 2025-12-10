import useGetProjectById from "../hooks/useGetProjectById";
import Section from "../components/Section";
import {
  Stack,
  Typography,
  Button,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DetailSection from "../components/DetailSection";
import useDeleteProject from "../hooks/useDeleteProject";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { User } from "../dummyUser";

const ProjectDetails = () => {
  const { id } = useParams();
  const { project } = useGetProjectById(id);
  const { deleteProject } = useDeleteProject();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleConfirmDelete = async () => {
    await deleteProject(id);
    setOpenConfirm(false);
    window.location.href = "/";
  };

  return (
    <Stack>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Delete Project?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} variant="outlined">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

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
          {User.role === "CSCSAdmin" ? (
            <Button
              variant="contained"
              onClick={handleOpenConfirm}
              sx={{
                fontSize: 12,
                width: "fit-content",
                gap: 2,
                bgcolor: "rgba(227, 45, 0, 1)",
              }}
            >
              <Tooltip title="Delete Project">
                <DeleteOutlineIcon />
              </Tooltip>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                Delete Project
              </Box>
            </Button>
          ) : null}
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
          projectId={id}
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
            {
              title: "Lead Department",
              text: project?.project_lead_department,
            },
            { title: "Contact Email", text: project?.project_poc_email },
            { title: "Contact Phone", text: project?.project_poc_phone },
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
              projectId={id}
              title="Supplier Details"
              data={[
                { title: "Company", text: "Supplier A" },
                { title: "Point of Contact", text: "Bob Johnson" },
                { title: "Contact Email", text: "bob.johnson@supplierA.com" },
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
              projectId={id}
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
