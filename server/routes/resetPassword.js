const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/:token", async (req, res) => {
  const user = jwt.verify(req.params.token, process.env.SECRET);
  let hashpass = await bcrypt.hash(req.body.password, 10);

  await db.query(
    `UPDATE users SET password = "${hashpass}" WHERE id = "${user.id}"`
  );

  res.status(200).json({ message: "Пароль успішно змінено" });
});

module.exports = router;
