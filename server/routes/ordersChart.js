const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT SUM(orders.count) AS orderCount, date, SUM(products.price * orders.count) AS income FROM orders INNER JOIN products ON products.id = orders.product_id WHERE status > 0 AND deleted = 0 GROUP BY date`
  );
  res.json(result);
});

module.exports = router;
