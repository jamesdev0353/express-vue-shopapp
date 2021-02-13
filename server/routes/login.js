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
    `SELECT * FROM users WHERE email like '${req.body.email}' LIMIT 1`,
    async (err, results) => {
      const json = JSON.parse(JSON.stringify(results));
      console.log(json);
      if (json.length > 0) {
        console.log(
          "password:",
          req.body.password,
          "from DB: ",
          json[0].password
        );
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
            res.status(200).json({
              token: `${token}`,
            });
          } else {
            res.status(401).json({
              message: "Паролі не співпали",
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
