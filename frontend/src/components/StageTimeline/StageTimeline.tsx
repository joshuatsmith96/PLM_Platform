import { Box, Stack, Typography } from "@mui/material";
import StageSelector from "./Parts/StageSelector";
import StageDetails from "./Parts/StageDetails";
import useStageDetails from "../../hooks/useStageDetails";
import useStageMaster from "../../hooks/useStageMaster";
import type { Stages } from "../../types/DataTypes";

type StageTimelineType = {
  projectId: string | undefined;
};

const StageTimeline = ({ projectId }: StageTimelineType) => {
  const { stageDetails, refreshStageDetails } = useStageDetails(projectId);
  const { stages } = useStageMaster();
  const Stages: Stages[] = stages;

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
          <StageSelector
            stageDetails={stageDetails}
            stages={stages}
            projectId={projectId}
          />
        </Box>
        <StageDetails
          stageDetails={stageDetails}
          stages={Stages}
          refresh={refreshStageDetails}
        />
      </Stack>
    </Stack>
  );
};

export default StageTimeline;
