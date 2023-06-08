const mysql = require("mysql2");

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "7Tj87&$hju23L",
  database: "blog",
});

module.exports = db;
