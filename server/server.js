const express = require("express");
const app = express();

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/categories", require("./routes/categories"));
app.use("/subcategories", require("./routes/subcategories"));

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
