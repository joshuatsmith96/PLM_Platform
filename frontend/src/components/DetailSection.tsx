import { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { DetailSectionType } from "../types/DataTypes";
import useUpdateProject from "../hooks/useUpdateProject";
import { User } from "../dummyUser";

interface DetailSectionProps extends DetailSectionType {
  editable?: boolean;
  projectId: string | undefined;
  onUpdate?: () => void;
}

const FIELD_MAPPING: Record<string, string> = {
  "Project ID": "project_id",
  "Project Name": "project_name",
  "Team Lead": "project_team_lead",
  "Lead Department": "project_lead_department",
  "Contact Email": "project_poc_email",
  "Contact Phone": "project_poc_phone",
  "Critical Status": "project_critical_status",
  "Lifecycle Type": "project_lifecycle_type",
  "Next Required Action": "project_next_required_action",
  "Current Stage": "project_current_stage",
  "Date Created": "project_creation_date",
};

// Map stage display names to stage IDs
const STAGE_NAME_TO_ID: Record<string, string> = {
  "Initiation & Planning": "S01_INIT",
  "Initiation/Planning": "S01_INIT",
  "Execution & Development": "S02_EXEC",
  "Execution/Development": "S02_EXEC",
  "Testing & Review": "S03_TEST",
  "Testing/Review": "S03_TEST",
  "Closing & Handover": "S04_CLOS",
  "Closing/Handover": "S04_CLOS",
};

const NON_EDITABLE_FIELDS = ["Project ID", "Date Created", "Current Stage"];

const DetailSection = ({
  title,
  data,
  projectId,
  onUpdate,
  editable,
}: DetailSectionProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { updateProject, loading, error, success } = useUpdateProject();

  const handleOpen = () => {
    const initialData: Record<string, string> = {};
    data.forEach((detail) => {
      initialData[detail.title] = detail.text || "";
    });
    setFormData(initialData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!projectId) {
      console.error("Project ID is required");
      return;
    }

    const mappedData: Record<string, string> = {};
    Object.keys(formData).forEach((displayTitle) => {
      if (NON_EDITABLE_FIELDS.includes(displayTitle)) {
        return;
      }

      const dbFieldName = FIELD_MAPPING[displayTitle] || displayTitle;
      let value = formData[displayTitle];

      if (displayTitle === "Current Stage" && value) {
        value = STAGE_NAME_TO_ID[value] || value;
      }

      mappedData[dbFieldName] = value;
    });

    try {
      console.log("Calling updateProject...");
      const result = await updateProject(projectId, mappedData);
      console.log("Update result:", result);

      if (onUpdate) {
        console.log("Calling onUpdate...");
        onUpdate();
      }
      handleClose();
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  return (
    <>
      <Stack>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}
        >
          <strong>{title}</strong>
          {editable && User.role === "CSCSAdmin" && (
            <EditIcon
              sx={{ cursor: "pointer", color: "#2196f3" }}
              onClick={handleOpen}
            />
          )}
        </Typography>
        <Stack sx={{ gap: 10, flexDirection: "row", flexWrap: "wrap" }}>
          {data.map((detail, index) => (
            <Box key={index}>
              <Typography sx={{ color: "rgba(82, 82, 82, 1)" }}>
                {detail.title}
              </Typography>
              <Typography>{detail.text}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {title}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Project updated successfully!
            </Alert>
          )}
          <Stack spacing={2} sx={{ mt: 2 }}>
            {data.map((detail, index) => (
              <TextField
                key={index}
                label={detail.title}
                value={formData[detail.title] || ""}
                onChange={(e) => handleChange(detail.title, e.target.value)}
                fullWidth
                size="small"
                disabled={NON_EDITABLE_FIELDS.includes(detail.title)}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailSection;
