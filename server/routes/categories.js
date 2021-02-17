const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  if(req.baseUrl == "/api/admin/categories"){
  db.query(`SELECT * FROM categories`, (err, result) => {
    res.json(result);
  });
} else {
    db.query(`SELECT * FROM categories WHERE level = 0`, (err, result) => {
    res.json(result);
  });
  }
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

router.get("/:cat", (req, res) => {
  console.log(req.originalUrl)
if(req.baseUrl == "/api/admin/categories"){
  db.query(
    `SELECT * FROM products WHERE subcategory_id = ${req.params.cat} ORDER BY id DESC`,
    (err, result) => {
      res.json(result);
    }
  );
} else {
    db.query(
    `SELECT * FROM categories WHERE parent_id = ${req.params.cat}`,
    (err, result) => {
       res.json(result);
    }
  );
}
//res.send(req.originalUrl)
});

router.get("/:cat/:subcat", (req, res) => {
  db.query(
    `SELECT * FROM products WHERE subcategory_id = ${req.params.subcat}  ORDER BY id DESC`,
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;