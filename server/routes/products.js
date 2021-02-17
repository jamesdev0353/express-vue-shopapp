const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    res.json(result);
  });
});

router.get("/:product_id", (req, res) => {
  if (req.baseUrl == "/api/admin/delete") {
    db.query(
      `DELETE FROM products WHERE id = ${req.params.product_id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(req.header("Referer"));
        }
      }
    );
  } else {
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
  }

  // db.query(
  //   `SELECT products.*, products.name name, GROUP_CONCAT(specs.name) spec_name, GROUP_CONCAT(specs.value) spec_value FROM products INNER JOIN specs ON specs.product_id = products.id WHERE products.id = ${req.params.product_id} GROUP BY products.id`,
  //   (err, result) => {
  //     res.json(result);
  //     console.log(err);
  //   }
  // );
});

module.exports = router;
