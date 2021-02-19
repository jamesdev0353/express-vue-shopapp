const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [result] = await db.query(
 `SELECT SUM(orders.count) as orderCount, date, SUM(products.price*orders.count) as income from orders inner join products ON products.id = orders.product_id where status>0 GROUP BY date`
  );
  res.json(result)
});

module.exports = router;
