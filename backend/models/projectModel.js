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
    pd.project_stage_notes,
    pd.project_stage_status
FROM 
    PROJECT p
-- Join to get the current stage name
INNER JOIN 
    STAGE_MASTER sm ON p.project_current_stage = sm.stage_id
-- LEFT JOIN to get the CURRENT details entry. 
-- NOTE: This simple join assumes the PROJECT_DETAILS record 
-- linked to the current stage is the most recent. 
-- For true "current" details, you might need a more complex subquery/view.
LEFT JOIN 
    PROJECT_DETAILS pd ON p.project_id = pd.project_id 
                        AND p.project_current_stage = pd.stage_id;
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

module.exports = {
  getAllProjects,
};
