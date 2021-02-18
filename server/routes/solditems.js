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

module.exports = router;
