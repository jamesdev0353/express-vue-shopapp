const mysql = require("mysql");

const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "tdMu2YTH2n",
  password: "cnl3DmmJUy",
  database: "tdMu2YTH2n",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected");

  setInterval(function () {
    db.query("SELECT 1");
    console.log("Ping to mysql server");
  }, 60000);
});

module.exports = db;
