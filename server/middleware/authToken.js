const jwt = require("jsonwebtoken");
require("dotenv").config();

function authToken(req, res, next) {
  //   const token = req.headers["auth"];
  const token = req.query.token;

  if (req.baseUrl == "/api/admin") {
    if (token == null) {
      res.status(401).json({ message: "Auth token not found" });
    } else {
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          res.status(403).json({ message: "verify error" });
          console.log(user);
        } else {
          next();
        }

        // req.user = user
      });
    }
  } else {
    next();
  }
}

module.exports = authToken;
