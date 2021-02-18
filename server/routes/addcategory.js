const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  let category = {
    parent_id: "0",
    child_id: "0",
    order_id: "0",
    lvl: "0",
    level: "0",
    name: req.body.name,
    img: req.body.image,
  };

  await db.query("INSERT INTO categories set ?", category);

  res.redirect(req.header("Referer"));
});

module.exports = router;
