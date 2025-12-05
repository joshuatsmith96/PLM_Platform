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

const getProjectById = async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    return res.status(400).json({ message: "Missing project ID parameter." });
  }

  try {
    const project = await projectModel.getProjectById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ID ${projectId} not found.` });
    }
    res.status(200).json({
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({
      message: "Failed to retrieve project due to a server error.",
      error: error.message,
    });
  }
};

const createProject = async (req, res) => {
  const requiredFields = [
    "project_id",
    "project_name",
    "project_creation_date",
    "project_current_stage",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ message: `Missing required field: ${field}` });
    }
  }

  try {
    const newProject = await projectModel.createProject(req.body);
    res.status(201).json({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project.",
      error: error.message,
    });
  }
};

module.exports = {
  getProjectById,
  getProjects,
  createProject,
};
