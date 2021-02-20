const { compareSync } = require("bcrypt");
const { Router } = require("express");
const router = Router();
const db = require("../config/db");

// Get 4 products of each category for main page
router.get("/", async (req, res) => {
  let [categories] = await db.query(
    `SELECT id, name FROM categories WHERE level = 0 and deleted = 0`
  );

  let arr = [];

  for (category of categories) {
    let [products] = await db.query(
      `SELECT * FROM products WHERE subcategory_id IN (SELECT id FROM categories WHERE parent_id = ${category.id} and deleted = 0) ORDER BY RAND() LIMIT 4`
    );
    arr.push({
      name: category.name,
      category_id: category.id,
      products: products,
    });
  }

  res.json(arr);
});

// Get all products for search
router.get("/all", async (req, res) => {
  let [result] = await db.query(`SELECT * FROM products WHERE deleted = 0`);

  res.json(result);
});

// Product details
router.get("/:product_id", async (req, res) => {
  if (req.baseUrl == "/api/admin/delete") {
    await db.query(`DELETE FROM products WHERE id = ${req.params.product_id}`);

    res.redirect(req.header("Referer"));
  } else {
    let [products] = await db.query(
      `SELECT * FROM products WHERE id = ${req.params.product_id} AND deleted = 0`
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

// Search filter
router.post("/:subcat", async (req, res) => {
  let [products] = await db.query(`SELECT products.* FROM products 
  INNER JOIN specs ON specs.product_id = products.id 
  WHERE specs.name IN (${db.escape(
    req.body.names
  )}) AND specs.value IN (${db.escape(req.body.values)}) 
  AND products.subcategory_id = ${
    req.params.subcat
  } AND deleted = 0 GROUP BY id`);

  res.json(products);
});

module.exports = router;
