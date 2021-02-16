const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query(
    `SELECT *, null AS password FROM users WHERE token = "${req.headers.token}"`,
    (err, result) => {
      res.json(result);
      console.log(err);
    }
  );
});

module.exports = router;
