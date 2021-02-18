const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async(req, res) => {
  let [categories] = await db.query(`SELECT id,name from categories where level = 0`)
  var arr = [];
  for(const element of categories){
    let [products] = await db.query(`SELECT * FROM products where subcategory_id in (SELECT id from categories where parent_id = ${element.id}) ORDER by RAND() LIMIT 4`)
    arr.push({name: element.name, products: products })
  }
  res.json(arr)
})

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

module.exports = router;
