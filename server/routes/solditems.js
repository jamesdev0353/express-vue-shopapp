const { Router } = require("express");
const router = Router();
const db = require("../config/db");

// Get cart for current user
router.get("/", (req, res) => {
  db.query(
    `SELECT orders.*,products.name,products.price, users.email FROM orders 
    INNER JOIN products ON products.id = orders.product_id 
    inner join users ON users.id = orders.user_id where status>0`,
    (err, result) => {
      console.log(err)
      res.json(result);
      // console.log(req.user_id);
    }
  );

  // db.query(
  //   `SELECT * FROM products WHERE id IN
  //     (SELECT product_id FROM orders WHERE user_id =
  //     (SELECT id FROM users WHERE token = "${req.params.token}"))`,
  //   (err, result) => {
  //     res.json(result);
  //     console.log(err);
  //   }
  // );
});

module.exports = router;
