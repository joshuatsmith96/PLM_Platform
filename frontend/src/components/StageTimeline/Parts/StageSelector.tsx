import { Stack } from "@mui/material";
import StageOption from "./StageOption";
import useStageDetails from "../../../hooks/useStageDetails";

type StageSelectorType = {
  id: string;
};

const StageSelector = ({ id }: StageSelectorType) => {
  const { stageDetails } = useStageDetails(id);
  console.log(stageDetails);
  return (
    <Stack>
      <StageOption stage="" status="Started" />
    </Stack>
  );
};

export default StageSelector;
