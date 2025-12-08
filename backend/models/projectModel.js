const db = require("../config/db");

const GET_ALL_PROJECTS_QUERY = `
SELECT 
    p.project_id, 
    p.project_name, 
    p.project_creation_date, 
    p.project_team_lead,
    sm.stage_name AS current_stage_name, 
    p.project_critical_status,
    p.project_next_required_action,
    sd.project_stage_notes,
    sd.project_stage_status
FROM 
    PROJECT p
INNER JOIN 
    STAGE_MASTER sm ON p.project_current_stage = sm.stage_id
LEFT JOIN 
    STAGE_DETAILS sd ON p.project_id = sd.project_id 
                        AND p.project_current_stage = sd.stage_id
`;

const getAllProjects = async () => {
  try {
    const result = await db.query(GET_ALL_PROJECTS_QUERY);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw new Error("Database query failed.");
  }
};

const getProjectById = async (projectId) => {
  const text = `${GET_ALL_PROJECTS_QUERY} WHERE p.project_id = $1;`;
  const values = [projectId];
  try {
    const result = await db.query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw new Error("Database query failed.");
  }
};

const createProject = async (projectData) => {
  const {
    project_id,
    project_name,
    project_creation_date,
    project_team_lead,
    project_lead_department,
    project_poc_email,
    project_poc_phone,
    project_current_stage,
    project_critical_status,
    project_lifecycle_type,
    project_next_required_action,
  } = projectData;

  const text = `
    INSERT INTO PROJECT (
      project_id, project_name, project_creation_date, project_team_lead, 
      project_lead_department, project_poc_email, project_poc_phone, 
      project_current_stage, project_critical_status, project_lifecycle_type, 
      project_next_required_action
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
    project_id,
    project_name,
    project_creation_date,
    project_team_lead,
    project_lead_department,
    project_poc_email,
    project_poc_phone,
    project_current_stage,
    project_critical_status,
    project_lifecycle_type,
    project_next_required_action,
  ];

  try {
    const result = await db.query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new project:", error);
    throw new Error(
      "Could not create project. Check data integrity and constraints."
    );
  }
};

const deleteProject = async (projectId) => {
  try {
    const deleteDetailsText = `
      DELETE FROM STAGE_DETAILS
      WHERE project_id = $1;
    `;
    await db.query(deleteDetailsText, [projectId]);

    const deleteProjectText = `
      DELETE FROM PROJECT
      WHERE project_id = $1
      RETURNING project_id;
    `;
    const result = await db.query(deleteProjectText, [projectId]);
    return result.rowCount;
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error);
    throw new Error("Could not execute multi-step delete process.");
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
};
