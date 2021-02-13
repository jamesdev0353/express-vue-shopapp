const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/:token", async (req, res) => {
  try {
    const user = jwt.verify(req.params.token, process.env.SECRET);
    var hashpass = await bcrypt.hash(req.body.password, 10);
    let sql = `UPDATE users SET password = '${hashpass}' WHERE id = '${user.id}'`;
    db.query(sql, (err, result) => {
      res.json({ message: "Пароль успішно змінено" });
    });
  } catch (e) {
    res.send("error:", e);
    console.log("error:", e);
  }
});

module.exports = router;
