import { Stack } from "@mui/material";
import type { ReactNode } from "react";

type PageContainerType = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerType) => {
  return (
    <Stack
      sx={{
        px: {
          xs: 2,
          sm: "10%",
        },
        py: 2,
      }}
    >
      {children}
    </Stack>
  );
};

export default PageContainer;
