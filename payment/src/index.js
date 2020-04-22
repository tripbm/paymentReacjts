import React from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardSetupForm from "./CardSetupForm";
require("dotenv").config();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_Is6FGqUxBvZmO0ab9d1rRDCe00SbADQWgf");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CardSetupForm />
    </Elements>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
