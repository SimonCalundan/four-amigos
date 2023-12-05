// pages/api/webhook.js

const stripe = require("stripe")("sk_test_...");
const express = require("express");
const app = express();

const endpointSecret =
  "whsec_dfd4307f437bb2b5153d8b33ce2db13d14e9a2c7b63a108e4a27fdd79fa408ff";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Handle the event here
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  }
);

export default app;
