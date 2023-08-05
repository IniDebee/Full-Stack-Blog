const mysql = require("mysql2");

const db = mysql.createPool({
  user: "admin",
  host: "mysql-138740-0.cloudclusters.net",
  password: "Efyg6abl",
  database: "blog",
  IPAddress: "108.181.197.179",
  port: "10088",
});


module.exports = db;
