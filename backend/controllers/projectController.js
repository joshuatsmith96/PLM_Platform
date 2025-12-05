const projectModel = require("../models/projectModel");

const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.status(200).json({
      message: "Projects retrieved successfully",
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve projects.",
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
};
