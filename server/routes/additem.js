const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:cat", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM specs WHERE subcategory_id = ${req.params.cat} GROUP BY name`
  );

  res.json(result);
});

router.post("/:cat", async (req, res) => {
  let product = {
    subcategory_id: req.params.cat,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    img: req.body.image,
    price: req.body.price,
    count: req.body.count,
  };

  let [result] = await db.query(`INSERT INTO products set ?`, product);
  const insertId = result.insertId;

  let [results] = await db.query(
    `SELECT * FROM specs WHERE subcategory_id = ${req.params.cat} GROUP BY name`
  );

  results.forEach(async (element) => {
    let specs = {
      subcategory_id: req.params.cat,
      product_id: insertId,
      name: element.name,
      value: req.body["spec_" + element.id],
    };

    await db.query(`INSERT INTO specs set ?`, specs);
  });

  res.redirect(req.header("Referer"));
});

module.exports = router;
