const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:cat", async (req, res) => {
  db.query(
    `SELECT * FROM specs WHERE subcategory_id = ${req.params.cat} GROUP BY name`,
    (err, result) => {
      console.log(err);
      res.json(result);
    }
  );
});

router.post("/:cat", async (req, res) => {
  json = JSON.parse(JSON.stringify(req.body));
  let product = {
    subcategory_id: req.params.cat,
    name: json.name,
    brand: json.brand,
    description: json.description,
    img: json.image,
    price: json.price,
    count: json.count,
  };

  db.query(`INSERT INTO products set ?`, product, (err, result) => {
    if (err) throw err;

    const insertId = result.insertId;

    // res.redirect(req.header('Referer'))
    db.query(
      `SELECT * FROM specs WHERE subcategory_id = ${req.params.cat} GROUP BY name`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(req.body);
        var i = 0;
        result.forEach((element) => {
          let specs = {
            subcategory_id: req.params.cat,
            product_id: insertId,
            name: element.name,
            value: "4gb",
          };
          let sql = "INSERT INTO specs set ?";
          db.query(sql, specs, (err, result) => {
            if (err) throw err;
            console.log(i);
            i++;
          });
        });
      }
    );
  });
});

module.exports = router;
