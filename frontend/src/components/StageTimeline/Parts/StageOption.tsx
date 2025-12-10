import Circle from "./Circle";
import { Stack, Typography } from "@mui/material";
import type { StatusTypes } from "../../../types/DataTypes";

type StageOptionType = {
  status: StatusTypes;
  id: string;
};

const statusColors: Record<StatusTypes, string> = {
  Complete: "#00CA3D",
  NotStarted: "#A0A0A0",
  Started: "#2BAAFF",
};

const StageOption = ({ status }: StageOptionType) => {
  const statusColor = statusColors[status];
  console.log(status);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        color: statusColor,
      }}
    >
      <Circle circleType={status} />
      <Typography>Test</Typography>
    </Stack>
  );
};

export default StageOption;
