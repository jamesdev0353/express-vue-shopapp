const { Router, json } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:subcat", (req, res) => {
  db.query(
    `SELECT name, GROUP_CONCAT(DISTINCT value) AS value FROM specs GROUP BY name WHERE subcategory_id = ${req.params.subcat}`,
    (err, result) => {
      for (let i = 0; i < result.length; i++) {
        result[i].value = result[i].value.split(",");
      }
      res.json(result);
    }
  );
});

// router.get("/:subcat", (req, res) => {
//   db.query(
//     `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
//     (err, result) => {
//       db.query(`SELECT name, value FROM specs GROUP BY name`, (err, result) => {
//         res.json(result);
//         console.log(err);
//       });
//     }
//   );
// });

router.get("/:subcat", (req, res) => {
  db.query(
    `SELECT value FROM (SELECT name, value FROM specs WHERE subcategory_id = ${req.params.subcat} GROUP BY name) AS sp ORDER BY sp.name`,
    (err, result) => {
      res.json(result);
      console.log(err);
    }
  );
});

router.get("/:subcat", (req, res) => {
  arr = [];

  db.query(
    `SELECT DISTINCT name FROM specs WHERE subcategory_id = ${req.params.subcat}`,
    (err, result) => {
      arr = result;
      for (let i = 0; i < result.length; i++) {
        db.query(
          `SELECT DISTINCT value FROM specs WHERE name = "${result[i].name}"`,
          async (err, result) => {
            // arr[i].value = result;
            // console.log(result);
            await arr.push(result);
          }
        );
      }

      console.log(arr);

      res.json(arr);

      // arr;
    }
  );
});

router.post("/", (req, res) => {
  //   db.query(
  //     `SELECT * FROM products WHERE id = ${req.params.product_id}`,
  //     (err, result) => {
  //       arr = result[0];
  //       db.query(
  //         `SELECT * FROM specs WHERE product_id = ${result[0].id}`,
  //         (err, result) => {
  //           arr.specs = result;
  //           res.json(arr);
  //         }
  //       );
  //     }
  //   );
});

module.exports = router;
