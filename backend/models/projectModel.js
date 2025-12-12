const db = require("../config/db");

const GET_ALL_PROJECTS_QUERY = `
SELECT 
    p.project_id, 
    p.project_name, 
    p.project_creation_date, 
    p.project_team_lead,
    p.project_lifecycle_type,
    p.project_lead_department,
    p.project_poc_phone,
    p.project_poc_email,
    sm.stage_name AS current_stage_name, 
    p.project_critical_status,
    p.project_next_required_action,
    sd.project_stage_status,
    sd.project_stage_notes,
    sd.project_stage_attachment_links
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

const STAGES = [
  { stage_id: "S01_INIT", sequence_order: 10 },
  { stage_id: "S02_BUILD", sequence_order: 20 },
  { stage_id: "S03_TEST", sequence_order: 30 },
  { stage_id: "S04_DEPLOY", sequence_order: 40 },
  { stage_id: "S05_CLOSE", sequence_order: 50 },
];

const createProject = async (projectData) => {
  const {
    project_id,
    project_name,
    project_team_lead,
    project_lead_department,
    project_poc_email,
    project_poc_phone,
    project_critical_status,
    project_lifecycle_type,
    project_next_required_action,
  } = projectData;

  const project_current_stage = "S01_INIT";

  const projectText = `
    INSERT INTO PROJECT (
      project_id, project_name, project_creation_date, project_team_lead, 
      project_lead_department, project_poc_email, project_poc_phone, 
      project_current_stage, project_critical_status, project_lifecycle_type, 
      project_next_required_action
    )
    VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const projectValues = [
    project_id,
    project_name,
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
    // Insert project
    const projectResult = await db.query(projectText, projectValues);

    // Insert ALL stages for this project
    const stageDetailText = `
      INSERT INTO STAGE_DETAILS (
        stage_detail_id, project_id, stage_id, project_stage_status, 
        project_stage_notes, project_stage_attachment_links, timestamp
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW());
    `;

    const stageInsertPromises = STAGES.map((stage) => {
      const status = stage.stage_id === "S01_INIT" ? "Started" : "Not Started";

      const values = [
        `${project_id}_${stage.stage_id.replace("S", "S")}`, // e.g. P1_S02_BUILD
        project_id,
        stage.stage_id,
        status,
        null,
        [],
      ];

      return db.query(stageDetailText, values);
    });

    await Promise.all(stageInsertPromises);

    return projectResult.rows[0];
  } catch (error) {
    console.error("Error creating new project:", error);
    throw new Error(
      "Could not create project. Check data integrity and constraints."
    );
  }
};

const updateProject = async (projectId, updateData) => {
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
  } = updateData;

  // Build dynamic update query based on provided fields
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (project_name !== undefined) {
    updates.push(`project_name = $${paramCount}`);
    values.push(project_name);
    paramCount++;
  }

  if (project_team_lead !== undefined) {
    updates.push(`project_team_lead = $${paramCount}`);
    values.push(project_team_lead);
    paramCount++;
  }

  if (project_lead_department !== undefined) {
    updates.push(`project_lead_department = $${paramCount}`);
    values.push(project_lead_department);
    paramCount++;
  }

  if (project_poc_email !== undefined) {
    updates.push(`project_poc_email = $${paramCount}`);
    values.push(project_poc_email);
    paramCount++;
  }

  if (project_poc_phone !== undefined) {
    updates.push(`project_poc_phone = $${paramCount}`);
    values.push(project_poc_phone);
    paramCount++;
  }

  if (project_current_stage !== undefined) {
    updates.push(`project_current_stage = $${paramCount}`);
    values.push(project_current_stage);
    paramCount++;
  }

  if (project_critical_status !== undefined) {
    updates.push(`project_critical_status = $${paramCount}`);
    values.push(project_critical_status);
    paramCount++;
  }

  if (project_lifecycle_type !== undefined) {
    updates.push(`project_lifecycle_type = $${paramCount}`);
    values.push(project_lifecycle_type);
    paramCount++;
  }

  if (project_next_required_action !== undefined) {
    updates.push(`project_next_required_action = $${paramCount}`);
    values.push(project_next_required_action);
    paramCount++;
  }

  if (updates.length === 0) {
    throw new Error("No fields provided for update");
  }

  values.push(projectId);

  const text = `
    UPDATE PROJECT
    SET ${updates.join(", ")}
    WHERE project_id = $${paramCount}
    RETURNING *;
  `;

  try {
    const result = await db.query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Could not update project.");
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
  updateProject,
  deleteProject,
};
