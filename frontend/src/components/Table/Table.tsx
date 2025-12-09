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
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { testData } from "./testData";
import TRow from "./Parts/TRow";
import TableColumns from "./Parts/TableColumns";

const projectsData = testData;

export default function OverviewTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [criticalStatusFilter, setCriticalStatusFilter] = useState("");
  const [lifecycleFilter, setLifecycleFilter] = useState("");

  return (
    <Box
      sx={{
        p: {
          xs: 1,
          sm: 2,
          md: 5,
        },
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "start",
            md: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Projects Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "#2196f3",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            "&:hover": { bgcolor: "#1976d2" },
            width: {
              xs: "100%",
              md: "300px",
            },
            mt: {
              xs: 5,
              lg: 0,
            },
          }}
        >
          Add New Project
        </Button>
      </Box>

      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
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
            width: {
              xs: "100%",
              md: 300,
            },
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

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <Table>
          <TableHead>
            <TableColumns />
          </TableHead>
          <TableBody>
            {projectsData.map((project, index) => (
              <TRow project={project} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
