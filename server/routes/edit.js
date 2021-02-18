const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:product_id", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM products WHERE id = ${req.params.product_id}`
  );

  res.json(result);
});

router.post("/:product_id", async (req, res) => {
  let product = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    img: req.body.image,
    price: req.body.price,
    count: req.body.count,
  };

  await db.query(
    `UPDATE products SET ? WHERE id = ${req.params.product_id}`,
    product
  );

  res.redirect(req.header("Referer"));
});

module.exports = router;
