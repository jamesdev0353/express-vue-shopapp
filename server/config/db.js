const mysql = require("mysql");

const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "tdMu2YTH2n",
  password: "cnl3DmmJUy",
  database: "tdMu2YTH2n",
});

db.connect((err) => {
  if (err) throw err;
  console.log("My sql connected");
});

module.exports = db;
