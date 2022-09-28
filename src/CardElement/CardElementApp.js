import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./CardElementApp.css";

const promise = loadStripe("pk_test_bxJuE0fpBxauHmThIvNnWtDt");

export default function CardElementApp () {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
