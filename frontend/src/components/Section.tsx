import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import PageContainer from "./PageContainer";

type SectionType = {
  children: ReactNode;
};

const Section = ({ children }: SectionType) => {
  return (
    <Stack sx={{ borderBottom: "solid thin rgba(174, 174, 174, 0.6)" }}>
      <PageContainer>{children}</PageContainer>
    </Stack>
  );
};

export default Section;
