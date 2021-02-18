const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.post("/:cat", async (req, res) => {
  let category = {
    parent_id: req.params.cat,
    child_id: "0",
    order_id: "0",
    lvl: "0",
    level: "1",
    name: req.body.name,
    img: req.body.image,
  };

  await db.query("INSERT INTO categories set ?", category);

  res.redirect(req.header("Referer"));
});

module.exports = router;
