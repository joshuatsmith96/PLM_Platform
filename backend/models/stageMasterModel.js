const db = require("../config/db");

const getAllStages = async () => {
  const text = `
    SELECT stage_id, stage_name, sequence_order
    FROM STAGE_MASTER
    ORDER BY sequence_order ASC;
  `;

  try {
    const result = await db.query(text);
    return result.rows;
  } catch (error) {
    console.error("Error fetching stage master:", error);
    throw new Error("Could not retrieve stage master data.");
  }
};

module.exports = { getAllStages };
