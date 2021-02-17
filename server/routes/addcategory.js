const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  json = JSON.parse(JSON.stringify(req.body));
  let category = {
    parent_id: '0',
    child_id: '0',
    order_id: '0',
    lvl: '0',
    level: '0',
    name: json.name,
    img: json.image
  };
  db.query("INSERT INTO categories set ?", category, (err, result) => {
    if (err){console.log(err)}
    res.redirect(req.header('Referer'))
  });
});

module.exports = router;