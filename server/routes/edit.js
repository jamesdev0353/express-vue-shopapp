const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:product_id", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE id = ${req.params.product_id}`,
    (err, result) => {
      if(err) console.log(err)
      res.json(result);
    console.log(result)
    }
  );
})

router.post("/:product_id", (req, res) => {
  json = JSON.parse(JSON.stringify(req.body));
  let product = {
    subcategory_id : req.params.cat,
    name: json.name,
    brand: json.brand,
    description: json.description,
    img: json.image,
    price: json.price,
    count: json.count,
  };
  let sql = "Update user set ? where id = ${req.params.product_id}";
  db.query(sql, product, (err, result) => {
    if (err) throw err;
    res.redirect(req.header('Referer'))
  });
});

module.exports = router;