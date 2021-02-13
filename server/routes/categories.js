const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM categories`, (err, result) => {
    res.json(result);
  });

  arr = [];

  db.query(`SELECT * FROM categories ORDER BY id`, (err, result) => {
    ress = JSON.parse(JSON.stringify(result));

    console.log(ress);

    result.forEach((element) => {
      db.query(
        `SELECT * FROM categories WHERE parent_id = ${element.id}`,
        (err, result) => {
          ress2 = JSON.parse(JSON.stringify(result));

          console.log(ress2);
        }
      );
    });

    // for (let i = 0; i < ress.length; i++) {
    //   // console.log(ress[i]);
    //   console.log(ress[i]);
    // }
  });
});

router.get("/:id", (req, res) => {
  db.query(
    `SELECT * FROM subcategories WHERE category_id = ${req.params.id}`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;
