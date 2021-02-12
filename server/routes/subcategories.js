const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM subcategories", (err, result) => {
    res.json(result);
  });
});

router.get("/:category_id", (req, res) => {
  db.query(
    `SELECT * FROM subcategories WHERE category_id = ${req.params.category_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;
