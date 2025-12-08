const stageModel = require("../models/stageModel");

const createStageDetail = async (req, res) => {
  const requiredFields = ["stage_detail_id", "project_id", "stage_id"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ message: `Missing required field: ${field}` });
    }
  }

  try {
    const newStageDetail = await stageModel.createStageDetail(req.body);
    res.status(201).json({
      message: "Stage detail created successfully",
      data: newStageDetail,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create stage detail.",
      error: error.message,
    });
  }
};

const updateStageDetail = async (req, res) => {
  const stageDetailId = req.params.id;

  if (!stageDetailId) {
    return res
      .status(400)
      .json({ message: "Missing stage detail ID parameter." });
  }

  const {
    project_stage_status,
    project_stage_notes,
    project_stage_attachment_link,
  } = req.body;

  if (
    !project_stage_status &&
    !project_stage_notes &&
    !project_stage_attachment_link
  ) {
    return res.status(400).json({
      message:
        "At least one field must be provided for update (project_stage_status, project_stage_notes, or project_stage_attachment_link)",
    });
  }

  try {
    const updatedStageDetail = await stageModel.updateStageDetail(
      stageDetailId,
      req.body
    );

    if (!updatedStageDetail) {
      return res.status(404).json({
        message: `Stage detail with ID ${stageDetailId} not found.`,
      });
    }

    res.status(200).json({
      message: "Stage detail updated successfully",
      data: updatedStageDetail,
    });
  } catch (error) {
    console.error("Error in updateStageDetail:", error);
    res.status(500).json({
      message: "Failed to update stage detail.",
      error: error.message,
    });
  }
};

module.exports = {
  createStageDetail,
  updateStageDetail,
};
