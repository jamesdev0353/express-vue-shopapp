const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  if (req.baseUrl == "/api/admin/categories") {
    var [result] = await db.query(`SELECT * FROM categories where deleted = 0`);
  } else {
    var [result] = await db.query(`SELECT * FROM categories WHERE level = 0 and deleted = 0`);
  }

  res.json(result);
});

// router.get("/:id", (req, res) => {
//   db.query(
//     `SELECT * FROM categories WHERE parent_id = ${req.params.id}`,
//     (err, result) => {
//       if (result.length) {
//         res.json(result);
//       } else {
//         db.query(
//           `SELECT * FROM products WHERE subcategory_id = ${req.params.id}`,
//           (err, result) => {
//             res.json(result);
//           }
//         );
//       }
//     }
//   );
// });

router.get("/:cat", async (req, res) => {
  if (req.baseUrl == "/api/admin/categories") {
    var [result] = await db.query(
      `SELECT * FROM products WHERE subcategory_id = ${req.params.cat} ORDER BY id DESC`
    );
  } else {
    var [result] = await db.query(
      `SELECT * FROM categories WHERE parent_id = ${req.params.cat} and deleted = 0`
    );
  }

  res.json(result);
});

router.get("/:cat/:subcat", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM products WHERE subcategory_id = ${req.params.subcat} ORDER BY id DESC`
  );

  res.json(result);
});

router.delete("/:cat", async (req, res) => {
  let [result] = await db.query(
    `Update categories set deleted = 1 where id = ${req.params.cat}`
  );
  let [result] = await db.query(
    `Update products set deleted = 1 where subcategory_id = ${req.params.cat}`
  );
  res.json(result);
});

module.exports = router;
