import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { logoA } from "../../utils/contentConstants";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { ImageDivBackground, showSnackBar } from "../CommonComponents";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/actions";
import { ROUTES, STRIPE_KEY } from "../../utils/api/routes";
import axios from "axios";

function Stripe({ cart, user, clearCart }) {
  const history = useHistory();
  let order = {
    cart,
    UserId: user._id,
    status: "PENDING",
    paymentMethod: "STRIPE",
    totalBill: cart.total,
  };
  const handleToken = async (token) => {
    console.log(token);

    try {
      const charge = await axios.post(ROUTES.PAYMENT_STRIPE, {
        token,
        amount: cart.total,
      });
      console.log(charge);
      const response = await axios.post(ROUTES.NEW_ORDER, { order });
      showSnackBar("Your order has been placed !", "success");
      history.push("/");
      clearCart();
    } catch (e) {
      console.log(e);
      showSnackBar("Fail to process your order", "error");
      history.push("/checkout");
    }
  };

  return (
    <>
      <StripeCheckout
        name="Saro Classic"
        amount={parseFloat(cart.total)} //Amount in cents $9.99
        image={logoA} // the pop-in header image (default none)
        token={handleToken}
        stripeKey={STRIPE_KEY}
        email={user.email}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ width: "200px", margin: "5px" }}
        >
          <ImageDivBackground
            image={require("../../assets/icons/stripe.png")}
            width="25px"
            height="25px"
            borderRadius="5px"
            style={{ marginRight: "10px" }}
          />
          Pay With Stripe
        </Button>
      </StripeCheckout>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps, { clearCart })(Stripe);
