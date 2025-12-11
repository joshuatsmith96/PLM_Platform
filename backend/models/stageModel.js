const db = require("../config/db");

const createStageDetail = async (stageData) => {
  const {
    stage_detail_id,
    project_id,
    stage_id,
    project_stage_status,
    project_stage_notes,
    project_stage_attachment_links,
  } = stageData;

  const text = `
    INSERT INTO STAGE_DETAILS (
      stage_detail_id, project_id, stage_id, project_stage_status,
      project_stage_notes, project_stage_attachment_links, timestamp
    )
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *;
  `;

  const values = [
    stage_detail_id,
    project_id,
    stage_id,
    project_stage_status || "Started",
    project_stage_notes || null,
    project_stage_attachment_links || [],
  ];

  try {
    const result = await db.query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating stage detail:", error);
    throw new Error(
      "Could not create stage detail. Check data integrity and constraints."
    );
  }
};

const updateStageDetail = async (stageDetailId, updateData) => {
  const {
    project_stage_status,
    project_stage_notes,
    project_stage_attachment_links,
  } = updateData;

  // Build dynamic update query based on provided fields
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (project_stage_status !== undefined) {
    updates.push(`project_stage_status = $${paramCount}`);
    values.push(project_stage_status);
    paramCount++;
  }

  if (project_stage_notes !== undefined) {
    updates.push(`project_stage_notes = $${paramCount}`);
    values.push(project_stage_notes);
    paramCount++;
  }

  if (project_stage_attachment_links !== undefined) {
    updates.push(`project_stage_attachment_links = $${paramCount}`);
    values.push(project_stage_attachment_links);
    paramCount++;
  }

  if (updates.length === 0) {
    throw new Error("No fields provided for update");
  }

  values.push(stageDetailId);

  const text = `
    UPDATE STAGE_DETAILS
    SET ${updates.join(", ")}
    WHERE stage_detail_id = $${paramCount}
    RETURNING *;
  `;

  try {
    const result = await db.query(text, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating stage detail:", error);
    throw new Error("Could not update stage detail.");
  }
};

const getStageDetailsByProjectId = async (projectId) => {
  const text = `
    SELECT 
      sd.*,
      sm.stage_name,
      sm.sequence_order
    FROM STAGE_DETAILS sd
    INNER JOIN STAGE_MASTER sm ON sd.stage_id = sm.stage_id
    WHERE sd.project_id = $1
    ORDER BY sm.sequence_order ASC;
  `;

  try {
    const result = await db.query(text, [projectId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching stage details:", error);
    throw new Error("Could not retrieve stage details for this project.");
  }
};

module.exports = {
  createStageDetail,
  updateStageDetail,
  getStageDetailsByProjectId,
};
