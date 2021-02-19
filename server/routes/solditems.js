const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT orders.*, products.name, products.price, users.email FROM orders 
    INNER JOIN products ON products.id = orders.product_id 
    INNER JOIN users ON users.id = orders.user_id WHERE status > 0`
  );

  res.json(result);
});

router.put("/:order_id", async (req, res) => {
  await db.query(
    `UPDATE orders SET status = ${req.body.status} WHERE id = ${req.params.order_id}`
  );

  res.send("OK");
});

module.exports = router;
