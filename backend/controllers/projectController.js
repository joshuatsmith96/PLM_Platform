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
  const requiredFields = ["project_id", "project_name"];
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

const updateProject = async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    return res.status(400).json({ message: "Missing project ID parameter." });
  }

  const {
    project_name,
    project_team_lead,
    project_lead_department,
    project_poc_email,
    project_poc_phone,
    project_current_stage,
    project_critical_status,
    project_lifecycle_type,
    project_next_required_action,
  } = req.body;

  // Check if at least one field is provided
  if (
    !project_name &&
    !project_team_lead &&
    !project_lead_department &&
    !project_poc_email &&
    !project_poc_phone &&
    !project_current_stage &&
    !project_critical_status &&
    !project_lifecycle_type &&
    !project_next_required_action
  ) {
    return res.status(400).json({
      message: "At least one field must be provided for update",
    });
  }

  try {
    const updatedProject = await projectModel.updateProject(
      projectId,
      req.body
    );

    if (!updatedProject) {
      return res.status(404).json({
        message: `Project with ID ${projectId} not found.`,
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error in updateProject:", error);
    res.status(500).json({
      message: "Failed to update project.",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedCount = await projectModel.deleteProject(projectId);

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Project with ID ${projectId} not found.` });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteProject:", error);
    res.status(500).json({
      message: "Failed to delete project.",
      error: error.message,
    });
  }
};

module.exports = {
  getProjectById,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
