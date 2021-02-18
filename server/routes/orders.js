const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const moment = require("moment");

// Get cart or purchased products for current user
router.get("/:status", async (req, res) => {
  let [result] = await db.query(
    `SELECT products.*, orders.* FROM products
    INNER JOIN orders ON products.id = orders.product_id
    INNER JOIN users ON users.id = orders.user_id WHERE users.id = "${req.user_id}" AND status = "${req.params.status}" GROUP BY user_id, product_id`
  );

  res.json(result);

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

// Purchase products for current user
router.post("/", async (req, res) => {
  const order = {
    status: 1,
    date: moment().format("DD.MM.YYYY"),
    payment_method: req.body.payment_method,
    delivery_method: req.body.delivery_method,
    region: req.body.region,
    city: req.body.city,
    delivery_address: req.body.delivery_address,
  };

  await db.query(
    `UPDATE products
    INNER JOIN ((SELECT product_id, count FROM orders WHERE user_id = ${req.user_id} AND status = 0)) 
    AS product ON products.id = product.product_id
    SET products.count = products.count - product.count`
  );

  await db.query(
    `UPDATE orders SET ? WHERE user_id = ${req.user_id} AND status = 0`,
    order
  );

  res.send("OK");
});

// Add to cart for current user
router.post("/:product_id", async (req, res) => {
  const order = {
    user_id: req.user_id,
    product_id: req.params.product_id,
  };

  let [result] = await db.query(
    `SELECT * FROM orders WHERE product_id = ${req.params.product_id} AND user_id = ${req.user_id} AND status = 0`
  );

  if (result.length > 0) {
    await db.query(
      `UPDATE orders SET count = count + 1 WHERE product_id = ${req.params.product_id} AND user_id = ${req.user_id} AND status = 0`
    );
  } else {
    await db.query(`INSERT INTO orders SET ?`, order);
  }

  res.send("OK");
});

// Update products count in cart for current user
router.put("/:order_id", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM products WHERE count >= ${req.body.count} AND id IN (SELECT product_id FROM orders WHERE id = ${req.params.order_id})`
  );

  if (result.length) {
    await db.query(
      `UPDATE orders SET count = "${req.body.count}" WHERE id = "${req.params.order_id}"`
    );

    res.send("OK");
  } else {
    res.send("Error");
  }
});

// Delete from cart for current user
router.delete("/:order_id", async (req, res) => {
  await db.query(`DELETE FROM orders WHERE id = "${req.params.order_id}"`);

  res.send("OK");
});

module.exports = router;
