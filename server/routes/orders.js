const { Router } = require("express");
const router = Router();
const db = require("../config/db");

// Get cart for current user
router.get("/", (req, res) => {
  db.query(
    `SELECT products.*, orders.id, orders.product_id, COUNT(*) AS count FROM products
    INNER JOIN orders ON products.id = orders.product_id
    INNER JOIN users ON users.id = orders.user_id WHERE users.id = "${req.user_id}" AND status = 0 GROUP BY user_id, product_id`,
    (err, result) => {
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

// Create order for current user
router.post("/", (req, res) => {
  const order = {
    status: 1,
    payment_method: req.body.payment_method,
    delivery_method: req.body.delivery_method,
    region: req.body.region,
    city: req.body.city,
    delivery_address: req.body.delivery_address,
  };

  db.query(
    `UPDATE orders SET ? WHERE user_id = ${req.user_id} AND status = 0`,
    order,
    (err, result) => {
      res.send("OK");
    }
  );
});

// Add to cart for current user
router.post("/:product_id", (req, res) => {
  const order = {
    user_id: req.user_id,
    product_id: req.params.product_id,
  };

  db.query(`INSERT INTO orders SET ?`, order, (err, result) => {
    res.send("OK");
    console.log(req.user_id, " - INSERT");
  });
});

// Update products count in cart for current user
router.put("/:order_id", (req, res) => {
  db.query(
    `UPDATE orders SET count = "${req.body.count}" WHERE id = "${req.params.order_id}"`,
    (err, result) => {
      res.send("OK");
    }
  );
});

// Delete from cart for current user
router.delete("/:order_id", (req, res) => {
  db.query(
    `DELETE FROM orders WHERE id = "${req.params.order_id}"`,
    (err, result) => {
      res.send("OK");
      // console.log(err);
    }
  );
});

module.exports = router;
