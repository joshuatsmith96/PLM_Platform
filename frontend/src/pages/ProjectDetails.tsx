import useGetProjectById from "../hooks/useGetProjectById";
import Section from "../components/Section";
import { Stack, Typography, Button, Box, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useParams } from "react-router-dom";
import { User } from "../dummyUser";

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
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}
        >
          <strong>Project Details</strong>
          {User.role === "CSCSAdmin" ? <EditIcon /> : ""}
        </Typography>
        <Stack sx={{ gap: 10, flexDirection: "row", flexWrap: "wrap" }}>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Project ID
            </Typography>
            <Typography>#POJ-123</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Next Required Action
            </Typography>
            <Typography>Review Supplier Design Proposal</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Current Stage
            </Typography>
            <Typography>Planning</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Date Created
            </Typography>
            <Typography>date_here</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Team Lead
            </Typography>
            <Typography>Josh Smith</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Lead Department
            </Typography>
            <Typography>Marketing</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Contact Email
            </Typography>
            <Typography>josh.smith@email.com</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
              Contact Phone
            </Typography>
            <Typography>123-456-7880</Typography>
          </Box>
        </Stack>
      </Section>
      <Section>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <Stack sx={{ gap: 5 }}>
            <Stack sx={{ gap: 5 }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <strong>Supplier Details</strong>
                {User.role === "CSCSAdmin" ? <EditIcon /> : ""}
              </Typography>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Company
                </Typography>
                <Typography>Comapny A</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Point of Contact
                </Typography>
                <Typography>Bob Johnson</Typography>
              </Box>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Contact Email
                </Typography>
                <Typography>bob.johnson@comapny.com</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Contact Phone
                </Typography>
                <Typography>763-123-4567</Typography>
              </Box>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Outstanding Requests
                </Typography>
                <Typography>Input on notes required</Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 5 }}>
            <Stack sx={{ gap: 5 }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <strong>Supplier Details</strong>
                {User.role === "CSCSAdmin" ? <EditIcon /> : ""}
              </Typography>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Company
                </Typography>
                <Typography>Distributor A</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Point of Contact
                </Typography>
                <Typography>Bill Smith</Typography>
              </Box>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Contact Email
                </Typography>
                <Typography>bill.smith@distributorA.com</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Contact Phone
                </Typography>
                <Typography>763-987-6543</Typography>
              </Box>
            </Stack>
            <Stack sx={{ gap: 4, flexDirection: "row" }}>
              <Box>
                <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                  Outstanding Requests
                </Typography>
                <Typography>Input on images required</Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Section>
    </Stack>
  );
};

export default ProjectDetails;
