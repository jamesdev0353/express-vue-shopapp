const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  // db.query(
  //   `SELECT * FROM products WHERE id IN
  //     (SELECT product_id FROM orders WHERE user_id =
  //     (SELECT id FROM users WHERE token = "${req.params.token}"))`,
  //   (err, result) => {
  //     res.json(result);
  //     console.log(err);
  //   }
  // );

  db.query(
    `SELECT products.*, orders.count FROM products
    INNER JOIN orders ON products.id = orders.product_id
    INNER JOIN users ON users.id = orders.user_id WHERE users.token = "${req.headers.token}"`,
    (err, result) => {
      res.json(result);
      console.log(err);
    }
  );
});

router.post("/", (req, res) => {
  //   db.query(
  //     `SELECT * FROM products WHERE id = ${req.params.product_id}`,
  //     (err, result) => {
  //       arr = result[0];
  //       db.query(
  //         `SELECT * FROM specs WHERE product_id = ${result[0].id}`,
  //         (err, result) => {
  //           arr.specs = result;
  //           res.json(arr);
  //         }
  //       );
  //     }
  //   );

  res.send("Orders post");
});

module.exports = router;
