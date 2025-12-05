const { Pool } = require("pg"); // or 'mysql2', etc.

const pool = new Pool({
  user: "your_user",
  host: "localhost",
  database: "your_project_db",
  password: "your_password",
  port: 5432, // Default PostgreSQL port
});

// A simple function to execute queries
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
