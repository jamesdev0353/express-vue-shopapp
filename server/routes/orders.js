const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// Get cart or purchased products for current user
router.get("/:status", async (req, res) => {
  if (req.params.status > 0) {
    var status_check = `status > 0`;
  } else {
    var status_check = `status = 0`;
  }

  let [result] = await db.query(
    `SELECT products.*, products.count as max_count, orders.* FROM products
    INNER JOIN orders ON products.id = orders.product_id
    INNER JOIN users ON users.id = orders.user_id WHERE users.id = "${req.user_id}" AND ${status_check} ORDER BY orders.id DESC`
  );

  res.json(result);

  // db.query(
  //   `SELECT * FROM products WHERE id IN
  //     (SELECT product_id FROM orders WHERE user_id =
  //     (SELECT id FROM users WHERE token = "${req.params.token}"))`,
  //   (err, result) => {
  //     res.json(result);
  //     console.log(err);
  //   }
  // );
});

// Pay products for current user
router.post("/", async (req, res) => {
  const order = {
    date: moment().format("DD.MM.YYYY"),
    payment_method: req.body.payment_method,
    delivery_method: req.body.delivery_method,
    region: req.body.region,
    city: req.body.city,
    delivery_address: req.body.delivery_address,
  };

  if (req.body.payment_method == 1) {
    let [products] = await db.query(
      `SELECT products.*,
      orders.count AS count 
      FROM products INNER JOIN orders 
      ON products.id = orders.product_id 
      WHERE orders.user_id = "${req.user_id}" AND orders.status = 0`
    );

    let items = [];

    for (product of products) {
      items.push({
        price_data: {
          currency: "UAH",
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.img],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.count,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url:
        "http://localhost:5000/api/orders/success/{CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5000/cart",
      metadata: {
        user_id: req.user_id,
      },
    });

    await db.query(
      `UPDATE orders SET ? WHERE user_id = ${req.user_id} AND status = 0`,
      order
    );

    res.json({ id: session.id });
  } else {
    await db.query(
      `UPDATE products
      INNER JOIN ((SELECT product_id, count FROM orders WHERE user_id = ${req.user_id} AND status = 0))
      AS product ON products.id = product.product_id
      SET products.count = products.count - product.count`
    );

    order.status = 1;
    await db.query(
      `UPDATE orders SET ? WHERE user_id = ${req.user_id} AND status = 0`,
      order
    );

    res.send("OK");
  }
});

// Payment success
router.get("/success/:payment_token", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.params.payment_token
  );

  await db.query(
    `UPDATE products
    INNER JOIN ((SELECT product_id, count FROM orders WHERE user_id = ${session.metadata.user_id} AND status = 0))
    AS product ON products.id = product.product_id
    SET products.count = products.count - product.count`
  );

  await db.query(
    `UPDATE orders SET status = 1 WHERE user_id = ${session.metadata.user_id} AND status = 0`
  );

  res.redirect("/success");
});

// Add to cart for current user
router.post("/:product_id", async (req, res) => {
  const order = {
    user_id: req.user_id,
    product_id: req.params.product_id,
  };

  let [result] = await db.query(
    `SELECT * FROM orders WHERE product_id = ${req.params.product_id} AND user_id = ${req.user_id} AND status = 0`
  );

  if (result.length > 0) {
    await db.query(
      `UPDATE orders SET count = count + 1 WHERE product_id = ${req.params.product_id} AND user_id = ${req.user_id} AND status = 0`
    );
  } else {
    await db.query(`INSERT INTO orders SET ?`, order);
  }

  res.send("OK");
});

// Update products count in cart for current user
router.put("/:order_id", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM products WHERE count >= ${req.body.count} AND id IN (SELECT product_id FROM orders WHERE id = ${req.params.order_id})`
  );

  if (result.length) {
    await db.query(
      `UPDATE orders SET count = "${req.body.count}" WHERE id = "${req.params.order_id}"`
    );

    res.send("OK");
  } else {
    res.send("Error");
  }
});

// Delete from cart for current user
router.delete("/:order_id", async (req, res) => {
  await db.query(`DELETE FROM orders WHERE id = "${req.params.order_id}"`);

  res.send("OK");
});

module.exports = router;
