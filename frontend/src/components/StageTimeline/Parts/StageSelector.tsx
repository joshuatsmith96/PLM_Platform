import { Stack } from "@mui/material";
import StageOption from "./StageOption";

type StageSelectorType = {
  id: string;
};

const StageSelector = ({ id }: StageSelectorType) => {
  return (
    <Stack>
      <StageOption id={id} status="Started" />
    </Stack>
  );
};

export default StageSelector;
