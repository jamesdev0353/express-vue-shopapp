const { Router } = require("express");
const db = require("../config/db");
const router = Router();

router.delete("/logout", async (req, res) => {
  await db.query(`UPDATE users SET token = "" WHERE id = ${req.user_id}`);

  res.send("OK");
});

module.exports = router;
