import { Box, Stack } from "@mui/material";
import StageOption from "./StageOption";
import useStageDetails from "../../../hooks/useStageDetails";
import useStageMaster from "../../../hooks/useStageMaster";
import type {
  StageDetailType,
  Stages,
  StatusTypes,
} from "../../../types/DataTypes";

type StageTimelineType = {
  projectId: string | undefined;
};

type FinalStageDetailsType = {
  stage_name: string;
  stage_id: string;
  status: StatusTypes;
};

const StageSelector = ({ projectId }: StageTimelineType) => {
  const { stageDetails } = useStageDetails(projectId);
  const { stages } = useStageMaster();

  const Details: StageDetailType[] = stageDetails;
  const Stages: Stages[] = stages;

  const finalStageDetails: FinalStageDetailsType[] = [];

  Stages.map((stage) => {
    const pushToDetails: FinalStageDetailsType = {
      stage_name: "",
      stage_id: "",
      status: "NotStarted",
    };

    for (let i = 0; i <= stages.length; i++) {
      if (stageDetails[i] && Details[i].stage_id === stage.stage_id) {
        pushToDetails.stage_id = Details[i].stage_detail_id;
        pushToDetails.status = Details[i].project_stage_status;
      } else {
        pushToDetails.stage_id = stage.stage_id;
      }
      pushToDetails.stage_name = stage.stage_name;
    }

    finalStageDetails.push(pushToDetails);
  });

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
      {finalStageDetails.map((stage, index) => {
        console.log(stage);
        if (index != stages.length - 1) {
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
              <StageOption
                projectId={projectId}
                stage={stage.stage_name}
                status={stage.status}
              />
              <Box
                sx={{
                  pl: {
                    xs: 0,
                    lg: 1.2,
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
              <StageOption
                projectId={projectId}
                stage={stage.stage_name}
                status={stage.status}
              />
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default StageSelector;
