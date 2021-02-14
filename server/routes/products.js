const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    res.json(result);
  });
});

router.get("/:product_id", (req, res) => {
  arr = {};

  db.query(
    `SELECT * FROM products WHERE id = ${req.params.product_id}`,
    (err, result) => {
      arr = result[0];

      db.query(
        `SELECT * FROM specs WHERE product_id = ${result[0].id}`,
        (err, result) => {
          arr.specs = result;

          res.json(arr);
        }
      );
    }
  );
});

module.exports = router;
