const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE id = ${req.params.id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;
