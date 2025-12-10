import { Box, Stack } from "@mui/material";
import StageOption from "./StageOption";

const StageSelector = () => {
  const DEFAULT_STAGES = [
    {
      stage_id: "S01_INIT",
      stage_name: "Initiation/Planning",
      sequence_order: 10,
    },
    {
      stage_id: "S02_BUILD",
      stage_name: "Execution/Development",
      sequence_order: 20,
    },
    {
      stage_id: "S03_TEST",
      stage_name: "Testing/Quality Assurance",
      sequence_order: 30,
    },
    {
      stage_id: "S04_DEPLOY",
      stage_name: "Deployment/Launch",
      sequence_order: 40,
    },
    {
      stage_id: "S05_CLOSE",
      stage_name: "Closeout/Review",
      sequence_order: 50,
    },
  ];

  console.log(DEFAULT_STAGES);

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: {
          xs: "center",
          lg: "start",
        },
      }}
    >
      {DEFAULT_STAGES.map((stage, index) => {
        if (index != DEFAULT_STAGES.length - 1) {
          return (
            <Stack
              sx={{
                flexDirection: {
                  xs: "row",
                  lg: "column",
                },
                alignItems: {
                  xs: "center",
                  lg: "start",
                },
              }}
            >
              <StageOption stage={stage.stage_name} status="NotStarted" />
              <Box
                sx={{
                  pl: {
                    xs: 3,
                    lg: 1.2,
                  },
                  pr: {
                    xs: 3,
                    lg: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "30px",
                      md: "50px",
                      lg: "1.5px",
                    },
                    height: {
                      xs: "1.5px",
                      lg: "50px",
                    },
                    backgroundColor: "#D9D9D9",
                  }}
                />
              </Box>
            </Stack>
          );
        } else {
          return (
            <Stack direction="column" alignItems="start">
              <StageOption stage={stage.stage_name} status="NotStarted" />
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default StageSelector;
