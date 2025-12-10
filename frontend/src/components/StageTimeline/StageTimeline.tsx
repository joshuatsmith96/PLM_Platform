import { Stack } from "@mui/material";
import StageSelector from "./Parts/StageSelector";
import StageDetails from "./Parts/StageDetails";

type StageTimelineType = {
  id: string;
};

const StageTimeline = ({ id }: StageTimelineType) => {
  return (
    <Stack>
      <StageSelector id={id} />
      <StageDetails />
    </Stack>
  );
};

export default StageTimeline;
