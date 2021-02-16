const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Login");
});

router.post("/", async (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email like "${req.body.email}" LIMIT 1`,
    async (err, results) => {
      const json = JSON.parse(JSON.stringify(results));
      console.log(json);
      if (json.length > 0) {
        bcrypt.compare(req.body.password, json[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: json[0].email,
                userId: json[0].id,
              },
              process.env.SECRET,
              { expiresIn: "30d" }
            );
            console.log(json[0].id, token);
            db.query(
              `UPDATE users SET token = '${token}' WHERE id = ${json[0].id}`,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                res.status(200).json({
                  token: `${token}`,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Неправильний логін або пароль",
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Користувача не існує",
        });
      }
    }
  );
});

module.exports = router;
