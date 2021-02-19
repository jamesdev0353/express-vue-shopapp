const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:product_id", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM specs WHERE product_id = ${req.params.product_id}`
  );

  res.json(result);
});

router.post("/add/:product_id", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM products WHERE id = ${req.params.product_id} and deleted = 0`
  );

  let spec = {
    subcategory_id: result[0].subcategory_id,
    product_id: req.params.product_id,
    name: req.body.name,
    value: req.body.value,
  };

  await db.query(`INSERT INTO specs SET ?`, spec);

  res.redirect(req.header("Referer"));
});

router.get("/delete/:id", async (req, res) => {
  await db.query(`DELETE FROM specs WHERE id = ${req.params.id}`);

  res.redirect(req.header("Referer"));
});

module.exports = router;
