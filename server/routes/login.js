const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  let [results] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );

  if (results.length > 0) {
    let result = await bcrypt.compare(req.body.password, results[0].password);

    if (result) {
      const token = jwt.sign(
        {
          userId: results[0].id,
        },
        process.env.SECRET
      );

      await db.query(
        `UPDATE users SET token = '${token}' WHERE id = ${results[0].id}`
      );

      res.status(200).json({
        token: `${token}`,
      });
    } else {
      res.status(401).json({
        message: "Неправильний логін або пароль",
      });
    }
  } else {
    res.status(404).json({
      message: "Такого користувача не існує",
    });
  }
});

module.exports = router;
