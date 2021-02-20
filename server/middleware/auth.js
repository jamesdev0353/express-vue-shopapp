const express = require("express");
const app = express();
const db = require("../config/db");

app.use((req, res, next) => {
  if (!req.user_id) {
    res.redirect("/login");
  }

  next();
});

module.exports = app;
