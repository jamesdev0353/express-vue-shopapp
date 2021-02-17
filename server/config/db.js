const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_USER,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected");

  db.query(
    `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
    () => {}
  );

  setInterval(function () {
    db.query("SELECT 1");
  }, 60000);
});

module.exports = db;
