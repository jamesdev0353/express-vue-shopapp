const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

router.post("/", async (req, res) => {
  await db.query(
    `SELECT * FROM users WHERE email like "${req.body.email}" LIMIT 1`,
    async (err, results) => {
      let json = JSON.parse(JSON.stringify(results));
      console.log(json);
      if (json.length > 0) {
        res.json({ message: "User already exists" });
      } else {
        json = JSON.parse(JSON.stringify(req.body));
        var hashpass = await bcrypt.hash(json.password, 10);
        jwt.sign(
          {
            email: json.email,
          },
          process.env.SECRET,
          {
            expiresIn: "1d",
          },
          (err, emailToken) => {
            const url = `http://localhost:5000/api/registration/${emailToken}`;
            if (err) {
              console.log(err);
            } else {
              transporter.sendMail({
                to: json.email,
                subject: "Підтвердження електронної пошти",
                html: `Доброго дня,${json.name} ${json.surname}. Для підтвердження аккаунту <a href="${url}">натисніть на цей текст</a>`,
              });
              let user = {
                name: json.name,
                surname: json.surname,
                email: json.email,
                phone: json.phone,
                password: hashpass,
                token: emailToken,
              };
              db.query("INSERT INTO users set ?", user, (err, result) => {
                if (err) throw err;
              });
              res.json({
                message: "Лист з підсвердженням на пошті",
                email: json.email,
              });
            }
          }
        );
      }
    }
  );
});

router.get("/:token", (req, res) => {
  try {
    const email = jwt.verify(req.params.token, process.env.SECRET);
    let sql = `UPDATE users SET verified = TRUE WHERE email = "${email.email}"`;
    db.query(sql, (err, result) => {
      res.send("Ти зарегався кста");
    });
  } catch (e) {
    res.send("error:", e);
    console.log("error:", e);
  }
});

module.exports = router;
