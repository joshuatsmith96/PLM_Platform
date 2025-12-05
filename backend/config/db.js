const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  port: 5433,
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
