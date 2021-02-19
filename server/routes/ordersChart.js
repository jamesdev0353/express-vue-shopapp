const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT SUM(orders.count) AS orderCount, date, SUM(products.price * orders.count) AS income FROM orders INNER JOIN products ON products.id = orders.product_id WHERE status > 0 AND deleted = 0 GROUP BY date`
  );
  res.json(result);
});

router.get("/categories", async (req, res) => {
  let [result] = await db.query(
 'SELECT SUM(orders.count) as orderCount, categories.name, SUM(products.price*orders.count) as income from orders inner join products ON products.id = orders.product_id inner join categories on products.subcategory_id = categories.id where status>0 GROUP BY categories.name'
  );
  res.json(result)
});

module.exports = router;

