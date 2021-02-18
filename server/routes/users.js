const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT *, null AS password FROM users WHERE id = "${req.user_id}"`
  );

  res.json(result);
});

module.exports = router;
