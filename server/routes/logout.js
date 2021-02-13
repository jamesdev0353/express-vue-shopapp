const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();

router.delete("/logout", async (req, res) => {
  const token = jwt.sign(
    {
      email: "",
      userId: "",
    },
    process.env.SECRET,
    { expiresIn: "0s" }
  );
  res.status(200).json({
    token: `${token}`,
  });
});

module.exports = router;
