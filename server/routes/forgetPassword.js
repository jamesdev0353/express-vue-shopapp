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
  let [results] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );

  if (results.length > 0) {
    const emailToken = jwt.sign(
      {
        id: results[0].id,
        email: results[0].email,
      },
      process.env.SECRET
    );

    transporter.sendMail({
      to: results[0].email,
      subject: "Скидання пароля",
      html: `Доброго дня, ${results[0].name} ${results[0].surname}. Для скидання пароля <a href="http://localhost:5000/resetPassword/${emailToken}">натисність сюди</a>`,
    });

    res.json({
      message: "Лист з підтвердженням був надісланий Вам на пошту",
      email: results[0].email,
    });
  } else {
    res.json({
      message: "Користувач з такою електронною поштою не знайдений",
    });
  }
});

module.exports = router;
