import { Stack, Typography } from "@mui/material";
import type { StageDetailType, Stages } from "../../../types/DataTypes";

type StageDetailsType = {
  stageDetails: StageDetailType[];
  stages: Stages[];
};

const StageDetails = ({ stageDetails, stages }: StageDetailsType) => {
  const currentStage: StageDetailType[] = stageDetails.filter(
    (stage) => stage.project_stage_status === "Started"
  );

  const stageName2 = () => {
    const matchedStage = stages.find(
      (s) => s.stage_id === currentStage[0].stage_id
    );
    return matchedStage?.stage_name;
  };

  return (
    <Stack
      sx={{
        border: "solid thin rgba(167, 167, 167, 1)",
        height: "70vh",
        p: 2,
        width: {
          xs: "auto",
          lg: "100%",
        },
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{stageName2()} Stage</Typography>
    </Stack>
  );
};

export default StageDetails;
