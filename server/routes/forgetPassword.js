const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

router.post("/", async (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email like '${req.body.email}' LIMIT 1`,
    async (err, results) => {
      const json = JSON.parse(JSON.stringify(results));
      console.log(json);
      if (json.length > 0) {
        jwt.sign(
        {
          id:json[0].id,
          email: json[0].email
        },
        process.env.SECRET,
        {
          expiresIn: "1d",
        },
        (err, emailToken) => {
        const url = `http://localhost:5000/resetPassword/${emailToken}`;
          if (err) throw err;
          console.log(json[0].email);
          transporter.sendMail({
            to: json[0].email,
            subject: "Скидання пароля",
            html: `Доброго дня,${json[0].name} ${json[0].surname},для скидання пароля <a href="${url}">натисніть на цей текст</a>`,
          });
         }
        );
        res.json({ message: "Лист з підтвердженням на пошті", email: json[0].email });
      } else {
        res.json({message: "Користувач з такою електронною поштою не знайдений"})
      }
   })
})

module.exports = router;