const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// Make payment
router.post("/", async (req, res) => {
  let [products] = await db.query(
    `SELECT GROUP_CONCAT(products.name SEPARATOR ", ") AS name, (products.price * orders.count) AS price FROM products INNER JOIN orders ON products.id = orders.product_id WHERE orders.user_id = "${req.user_id}" AND orders.status = 0`
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "UAH",
          product_data: {
            name: products[0].name,
          },
          unit_amount: products[0].price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5000/success",
    cancel_url: "http://localhost:5000/cart",
  });

  res.json({ id: session.id });
});

module.exports = router;
