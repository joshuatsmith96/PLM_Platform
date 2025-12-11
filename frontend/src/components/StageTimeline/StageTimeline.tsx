import { Box, Stack, Typography } from "@mui/material";
import StageSelector from "./Parts/StageSelector";
import StageDetails from "./Parts/StageDetails";

type StageTimelineType = {
  projectId: string | undefined;
};

const StageTimeline = ({ projectId }: StageTimelineType) => {
  return (
    <Stack>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 5,
          fontWeight: "bold",
        }}
      >
        Stage Timeline
      </Typography>
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: 4,
        }}
      >
        <Box
          sx={{
            overflowX: {
              xs: "auto",
              lg: "hidden",
            },
          }}
        >
          <StageSelector projectId={projectId} />
        </Box>
        <StageDetails />
      </Stack>
    </Stack>
  );
};

export default StageTimeline;
