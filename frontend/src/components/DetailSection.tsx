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
  projectId: string | undefined;
  onUpdate?: () => void;
}

const DetailSection = ({
  title,
  data,
  projectId,
  onUpdate,
}: DetailSectionProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { updateProject, loading, error, success } = useUpdateProject();

  const handleOpen = () => {
    const initialData: Record<string, string> = {};
    data.forEach((detail) => {
      console.log(detail);
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

    try {
      await updateProject(projectId, formData);
      if (onUpdate) {
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
          {User.role === "CSCSAdmin" && (
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
