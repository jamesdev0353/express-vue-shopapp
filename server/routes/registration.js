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
  let [result] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );

  if (result.length > 0) {
    res.json({ message: "Користувач з такою поштою вже існує" });
  } else {
    let hashpass = await bcrypt.hash(req.body.password, 10);
    let emailToken = jwt.sign({ email: req.body.email }, process.env.SECRET);

    transporter.sendMail({
      to: req.body.email,
      subject: "Підтвердження електронної пошти",
      html: `Доброго дня, ${req.body.name} ${req.body.surname}. Для підтвердження аккаунту <a href="http://localhost:5000/api/registration/${emailToken}">натисніть сюди</a>`,
    });

    let user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashpass,
      token: emailToken,
    };

    await db.query("INSERT INTO users set ?", user);

    res.json({
      message: "Ми відправили лист з підтвердженням Вам на пошту",
      email: req.body.email,
    });
  }
});

router.get("/:token", async (req, res) => {
  try {
    const email = jwt.verify(req.params.token, process.env.SECRET);

    await db.query(
      `UPDATE users SET verified = true WHERE email = "${email.email}"`
    );

    res.send("Пошту підтверджено успішно!");
  } catch (error) {
    res.send("Не валідний токен");
  }
});

module.exports = router;
