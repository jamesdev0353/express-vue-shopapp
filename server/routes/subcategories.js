const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("", (req, res) => {
  db.query("SELECT * FROM subcategories", (err, result) => {
    res.json(result);
  });
});

router.get("/:subcategory_id", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE subcategory_id = ${req.params.subcategory_id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;
