require('dotenv').config();
const express = require("express");
const app = express();

// STRIPE_SANDBOX
// SX_SANDBOX
const stripe = require("stripe")(process.env.STRIPE_SANDBOX);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Random amount, usually would take in actual values.
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  console.log("method: create-payment-intent");
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post('/create-checkout-session', async (req, res) => {
  console.log("method: create-checkout-session");

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'Depositing',
            description: 'into Bruce Wayne\'s account',
            images: ['https://i.imgur.com/s7YSDEH.png']
          },
          unit_amount: 7500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
