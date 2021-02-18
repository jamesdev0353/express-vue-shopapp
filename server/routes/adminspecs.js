const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:product_id", (req, res) => {
  arr = {};
    db.query(
      `SELECT * FROM specs WHERE product_id = ${req.params.product_id}`,
      (err, result) => {
        res.json(result)
      }
    );
})

router.post("/add/:product_id", (req, res) => {
	db.query(
     `SELECT * FROM products WHERE id = ${req.params.product_id}`,
    (err, result) => {
  	let spec = {
  	subcategory_id: result[0].subcategory_id,
  	product_id: req.params.product_id,
  	name:req.body.name,
  	value:req.body.value,
  	}
    db.query(
      `INSERT INTO specs SET ?`, spec,
      (err, result) => {
       res.redirect(req.header('Referer'))
      }
    );
  });
})

router.get("/delete/:id", (req, res) => {
	db.query(
      `DELETE FROM specs WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(req.header("Referer"));
        }
      }
    );
})

module.exports = router;