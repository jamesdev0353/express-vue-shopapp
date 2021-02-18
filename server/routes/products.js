const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [categories] = await db.query(
    `SELECT id, name FROM categories WHERE level = 0`
  );

  let arr = [];

  for (element of categories) {
    let [products] = await db.query(
      `SELECT * FROM products WHERE subcategory_id IN (SELECT id FROM categories WHERE parent_id = ${element.id}) ORDER BY RAND() LIMIT 4`
    );
    arr.push({ name: element.name, products: products });
  }

  res.json(arr);
});

router.get("/:product_id", async (req, res) => {
  if (req.baseUrl == "/api/admin/delete") {
    await db.query(`DELETE FROM products WHERE id = ${req.params.product_id}`);

    res.redirect(req.header("Referer"));
  } else {
    let [products] = await db.query(
      `SELECT * FROM products WHERE id = ${req.params.product_id}`
    );

    [products[0].specs] = await db.query(
      `SELECT * FROM specs WHERE product_id = ${products[0].id}`
    );

    res.json(products[0]);
  }

  // let [result] = await db.query(
  //   `SELECT products.*, products.name name, GROUP_CONCAT(specs.name) spec_name, GROUP_CONCAT(specs.value) spec_value FROM products INNER JOIN specs ON specs.product_id = products.id WHERE products.id = ${req.params.product_id} GROUP BY products.id`
  // );
});


router.post("/", async (req, res) => {
  let [products] = await db.query(
      `SELECT products.* FROM products INNER JOIN specs ON specs.product_id = products.id where specs.name in (${req.body.names}) and specs.value in (${req.body.values}) `
    );
  res.json(products)
});

module.exports = router;
