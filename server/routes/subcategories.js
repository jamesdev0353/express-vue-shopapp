const { Router } = require("express");
const router = Router();
const mysql = require("../config/db");

router.get("/", (req, res) => {
  res.send("Categories");
});

module.exports = router;
