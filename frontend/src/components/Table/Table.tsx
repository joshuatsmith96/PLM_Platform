import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useProjects from "../../hooks/useProjects";
import TRow from "./Parts/TRow";
import TableColumns from "./Parts/TableColumns";
import { User } from "../../dummyUser";

export default function OverviewTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [criticalStatusFilter, setCriticalStatusFilter] = useState<string>("");
  const [lifecycleFilter, setLifecycleFilter] = useState<string>("");

  const { projects, loading, error, refetch } = useProjects();

  // --- Dialog state ---
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    project_name: "",
    project_team_lead: "",
    project_lead_department: "",
    project_poc_email: "",
    project_poc_phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProjectData({
      project_name: "",
      project_team_lead: "",
      project_lead_department: "",
      project_poc_email: "",
      project_poc_phone: "",
    });
    setSubmitError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Determine next project ID
      const lastIdNumber =
        projects
          .map((p) => parseInt(p.project_id.replace("P", ""), 10))
          .sort((a, b) => b - a)[0] || 0;
      const nextProjectId = `P${lastIdNumber + 1}`;

      const payload = {
        project_id: nextProjectId,
        project_name: newProjectData.project_name,
        project_team_lead: newProjectData.project_team_lead,
        project_lead_department: newProjectData.project_lead_department,
        project_poc_email: newProjectData.project_poc_email,
        project_poc_phone: newProjectData.project_poc_phone,
        project_critical_status: "Started",
        project_lifecycle_type: "New Item",
        project_next_required_action: "Nothing",
      };

      const response = await fetch("http://localhost:3000/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add project: ${response.statusText}`);
      }

      await refetch(); // Refresh table
      handleCloseDialog();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSubmitError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error loading projects: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 5 }, minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Projects Overview
        </Typography>
        {User.role !== "ReadOnly" && (
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: "#2196f3",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              "&:hover": { bgcolor: "#1976d2" },
              width: { xs: "100%", md: 300 },
              mt: { xs: 5, lg: 0 },
            }}
            onClick={handleOpenDialog}
          >
            Add New Project
          </Button>
        )}
      </Box>

      {/* Filters */}
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
          justifyContent: "space-between",
        }}
      >
        <TextField
          placeholder="Search for project..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            width: { xs: "100%", md: 300 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#999" }} />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <FormControl
          sx={{ minWidth: 200, bgcolor: "white", borderRadius: 1 }}
          size="small"
        >
          <Select
            value={criticalStatusFilter}
            onChange={(e) => setCriticalStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
            }}
          >
            <MenuItem value="">Critical Status</MenuItem>
            <MenuItem value="new">New Item</MenuItem>
            <MenuItem value="transitioning">Transitioning Item</MenuItem>
            <MenuItem value="deleting">Deleting Item</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ minWidth: 200, bgcolor: "white", borderRadius: 1 }}
          size="small"
        >
          <Select
            value={lifecycleFilter}
            onChange={(e) => setLifecycleFilter(e.target.value)}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
            }}
          >
            <MenuItem value="">Lifecycle Type</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <Table>
          <TableHead>
            <TableColumns />
          </TableHead>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <TRow
                  key={project.project_id}
                  project={project}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                  No projects found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Project Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Name"
            name="project_name"
            fullWidth
            value={newProjectData.project_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Team Lead"
            name="project_team_lead"
            fullWidth
            value={newProjectData.project_team_lead}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Lead Department"
            name="project_lead_department"
            fullWidth
            value={newProjectData.project_lead_department}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Contact Email"
            name="project_poc_email"
            fullWidth
            value={newProjectData.project_poc_email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Contact Phone"
            name="project_poc_phone"
            fullWidth
            value={newProjectData.project_poc_phone}
            onChange={handleChange}
          />
          {submitError && <Alert severity="error">{submitError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : "Add Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
