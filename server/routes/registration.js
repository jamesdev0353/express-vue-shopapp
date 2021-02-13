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
  let json = JSON.parse(JSON.stringify(req.body));
  var hashpass = await bcrypt.hash(json.password, 10);
  let user = {
    name: json.name,
    surname: json.surname,
    email: json.email,
    phone: json.phone,
    password: hashpass,
  };
  let sql = "INSERT INTO users set ?";
  db.query(sql, user, (err, result) => {
    if (err) throw err;
  });

  await jwt.sign(
    {
      email: json.email,
    },
    process.env.SECRET,
    {
      expiresIn: "1d",
    },
    (err, emailToken) => {
      const url = `http://localhost:5000/api/registration/${emailToken}`;
      if (err) throw err;
      console.log(json.email);
      transporter.sendMail({
        to: json.email,
        subject: "Підтвердження електронної пошти",
        html: `Доброго дня,${json.name} ${json.surname},для підтвердження аккаунту <a href="${url}">натисніть на цей текст</a>`,
      });
    }
  );
  res.json({ message: "Лист з підсвердженням на пошті", email: json.email });
});

router.get("/:token", (req, res) => {
  try {
    const email = jwt.verify(req.params.token, process.env.SECRET);
    console.log("email:", email);
    let sql = `UPDATE users SET verified = TRUE WHERE email = '${email.email}'`;
    db.query(sql, (err, result) => {
      res.send("Ти зарегався кста");
    });
  } catch (e) {
    res.send("error:", e);
    console.log("error:", e);
  }
});

module.exports = router;
