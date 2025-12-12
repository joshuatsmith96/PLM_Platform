import { Stack, Typography, TextField, Button } from "@mui/material";
import type { StageDetailType, Stages } from "../../../types/DataTypes";
import useUpdateStageDetail from "../../../hooks/useUpdateStage";
import { useState } from "react";

type StageDetailsType = {
  stageDetails: StageDetailType[];
  stages: Stages[];
  refresh: () => void;
};

const StageDetails = ({ stageDetails, stages, refresh }: StageDetailsType) => {
  const { updateStageDetail } = useUpdateStageDetail();

  const currentStage = stageDetails.find(
    (stage) => stage.project_stage_status === "Started"
  );

  const [notes, setNotes] = useState<string>("");

  const displayedNotes =
    notes !== "" ? notes : currentStage?.project_stage_notes || "";

  if (!currentStage) {
    return <Typography>All Stages Complete</Typography>;
  }

  const stageName = stages.find(
    (s) => s.stage_id === currentStage.stage_id
  )?.stage_name;

  const currentSequence = currentStage.sequence_order;
  const previousSequence = currentSequence ? currentSequence - 10 : 0;
  const nextSequence = currentSequence ? currentSequence + 10 : 0;

  const nextStage = stageDetails.filter(
    (detail) => detail.sequence_order === nextSequence
  );

  const previousStage = stageDetails.filter(
    (detail) => detail.sequence_order === previousSequence
  );

  const emptyAll = () => {
    setNotes("");
  };

  const nextStageButtonClick = async () => {
    try {
      await updateStageDetail(currentStage.stage_detail_id, {
        project_stage_status: "Complete",
      });
      await updateStageDetail(nextStage[0].stage_detail_id, {
        project_stage_status: "Started",
      });
      refresh();
      emptyAll();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const previousStageButtonClick = async () => {
    try {
      await updateStageDetail(currentStage.stage_detail_id, {
        project_stage_status: "NotStarted",
      });
      await updateStageDetail(previousStage[0].stage_detail_id, {
        project_stage_status: "Started",
      });
      refresh();
      emptyAll();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const saveDetails = async () => {
    await updateStageDetail(currentStage.stage_detail_id, {
      project_stage_notes: notes,
    });
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
          value={displayedNotes}
          onChange={(e) => setNotes(e.target.value)}
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
          onClick={() => saveDetails()}
        >
          Save
        </Button>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            onClick={() => previousStageButtonClick()}
            disabled={currentSequence === 10}
          >
            Go Back to Previous Stage
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            color="success"
            onClick={() => nextStageButtonClick()}
          >
            {currentSequence === 50 ? "Complete Project" : "Move to Next Stage"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StageDetails;
