import Circle from "./Circle";
import { Stack, Typography } from "@mui/material";
import type { StatusTypes } from "../../../types/DataTypes";

type StageOptionType = {
  status: StatusTypes;
  stage: string;
};

const statusColors: Record<StatusTypes, string> = {
  Complete: "#00CA3D",
  NotStarted: "#A0A0A0",
  Started: "#2BAAFF",
};

const StageOption = ({ status, stage }: StageOptionType) => {
  const statusColor = statusColors[status];

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        color: statusColor,
        py: 2,
      }}
    >
      <Circle circleType={status} />
      <Typography>{stage}</Typography>
    </Stack>
  );
};

export default StageOption;
