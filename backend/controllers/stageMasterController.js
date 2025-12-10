const stageMasterModel = require("../models/stageMasterModel");

const getAllStages = async (req, res) => {
  try {
    const stages = await stageMasterModel.getAllStages();

    res.status(200).json({
      message: "Stage master retrieved successfully",
      data: stages,
    });
  } catch (error) {
    console.error("Error in getAllStages:", error);
    res.status(500).json({
      message: "Failed to retrieve stage master.",
      error: error.message,
    });
  }
};

module.exports = { getAllStages };
