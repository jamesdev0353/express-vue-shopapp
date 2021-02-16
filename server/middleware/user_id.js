const express = require("express");
const app = express();
const db = require("../config/db");

app.use((req, res, next) => {
  db.query(
    `SELECT id FROM users WHERE token = "${req.headers.token}"`,
    (err, result) => {
      try {
        req.user_id = result[0].id;
      } catch (error) {
        req.user_id = 0;
      }

      console.log(req.user_id, req.headers.token);

      next();
    }
  );
});

module.exports = app;
