const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:subcat", async (req, res) => {
  let [result] = await db.query(
    `SELECT name, GROUP_CONCAT(DISTINCT value) AS value FROM specs WHERE subcategory_id = ${req.params.subcat} GROUP BY name`
  );

  for (let i = 0; i < result.length; i++) {
    result[i].value = result[i].value.split(",");
  }

  res.json(result);
});

// router.get("/:subcat", (req, res) => {
// db.query(`SELECT name, value FROM specs GROUP BY name`, (err, result) => {
//   res.json(result);
//   console.log(err);
// });
// });

router.get("/:subcat", async (req, res) => {
  let [result] = await db.query(
    `SELECT value FROM (SELECT name, value FROM specs WHERE subcategory_id = ${req.params.subcat} GROUP BY name) AS sp ORDER BY sp.name`
  );

  res.json(result);
});

router.get("/:subcat", async (req, res) => {
  let [arr] = await db.query(
    `SELECT DISTINCT name FROM specs WHERE subcategory_id = ${req.params.subcat}`
  );

  for (let i = 0; i < result.length; i++) {
    let [result] = await db.query(
      `SELECT DISTINCT value FROM specs WHERE name = "${result[i].name}"`
    );
    // arr[i].value = result;
    arr.push(result);
  }

  res.json(arr);
});

module.exports = router;
