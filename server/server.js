const express = require("express");
const app = express();

// Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get user id by token to req.user_id
app.use(require("./middleware/user_id"));
// const auth = require("./middleware/auth");

// Routes
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/specs", require("./routes/specs"));
app.use("/api/orders", require("./routes/orders"));

app.use("/api/login", require("./routes/login"));
app.use("/api/registration", require("./routes/registration"));
app.use("/api/forgetPassword", require("./routes/forgetPassword"));
app.use("/api/resetPassword", require("./routes/resetPassword"));
app.use("/api/users", require("./routes/users"));

app.use("/api/admin/categories", require("./routes/categories"));
app.use("/api/admin/additem", require("./routes/additem"));
app.use("/api/admin/delete", require("./routes/products"));
app.use("/api/admin/edit", require("./routes/edit"));
app.use("/api/admin/addcategory", require("./routes/addcategory"));
app.use("/api/admin/addsubcategory", require("./routes/addsubcategory"));
app.use("/api/admin/specs", require("./routes/adminspecs"));
app.use("/api/admin/solditems", require("./routes/solditems"));
app.use("/api/admin/ordersChart", require("./routes/ordersChart"));

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
