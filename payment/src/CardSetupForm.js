import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

class CardSetupForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardSetup(
      "{{ getStripeClientSecret }}",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      }
    );

    if (result.error) {
      // Display result.error.message in your UI.
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Save Card</button>
      </form>
    );
  }
}

export default function InjectedCardSetupForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CardSetupForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
