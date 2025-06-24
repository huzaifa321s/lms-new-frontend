import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const PaymentElementCustom = () => {
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <label>
        Card Number
        <CardNumberElement onChange={handleChange} />
      </label>
      <label>
        Expiration Date
        <CardExpiryElement onChange={handleChange} />
      </label>
      <label>
        CVC
        <CardCvcElement onChange={handleChange} />
      </label>
      {error && <div>{error}</div>}
    </div>
  );
};

export default PaymentElementCustom;