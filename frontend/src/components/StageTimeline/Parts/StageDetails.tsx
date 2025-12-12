import { Stack, Typography, TextField, Button } from "@mui/material";
import type { StageDetailType, Stages } from "../../../types/DataTypes";
import useUpdateStageDetail from "../../../hooks/useUpdateStage";

type StageDetailsType = {
  stageDetails: StageDetailType[];
  stages: Stages[];
};

const StageDetails = ({ stageDetails, stages }: StageDetailsType) => {
  const { updateStageDetail } = useUpdateStageDetail();

  const currentStage = stageDetails.find(
    (stage) => stage.project_stage_status === "Started"
  );

  if (!currentStage) {
    return <Typography>No stage started yet.</Typography>;
  }

  const stageName = stages.find(
    (s) => s.stage_id === currentStage.stage_id
  )?.stage_name;

  const currentSequence = currentStage.sequence_order;
  const previousSequence = currentStage.sequence_order
    ? currentStage.sequence_order - 10
    : 0;
  const nextSequence = currentStage.sequence_order
    ? currentStage.sequence_order + 10
    : 0;

  const nextStageButtonClick = async () => {
    try {
      await updateStageDetail(currentStage.project_id, {
        project_stage_status: "Complete",
      });
      console.log("Update successful!");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Stack
      sx={{
        border: "solid thin rgba(167, 167, 167, 1)",
        p: 2,
        width: { xs: "auto", lg: "100%" },
        gap: 3,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{stageName} Stage</Typography>

      <Stack>
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>Notes</Typography>
        <TextField
          multiline
          minRows={10}
          value={currentStage.project_stage_notes ?? ""}
        />
      </Stack>

      <Stack>
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
          Attachements / Documents
        </Typography>
        <Stack
          sx={{
            border: "solid thin rgba(167, 167, 167, 1)",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            No Attachments Yet
          </Typography>
          <Typography sx={{ color: "#2BAAFF" }}>Download</Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: {
              xs: "100%",
              md: 200,
            },
            fontSize: 12,
          }}
        >
          Save
        </Button>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <Button variant="contained" sx={{ fontSize: 12 }}>
            Go Back to Previous Stage
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            color="success"
            onClick={() => nextStageButtonClick()}
          >
            Move to Next Stage
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StageDetails;
