import { Typography, Stack, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { DetailSectionType } from "../types/DataTypes";

import { User } from "../dummyUser";

const DetailSection = ({ title, data }: DetailSectionType) => {
  return (
    <Stack>
      <Typography
        variant="h6"
        sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}
      >
        <strong>{title}</strong>
        {User.role === "CSCSAdmin" ? <EditIcon /> : ""}
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
  );
};

export default DetailSection;
