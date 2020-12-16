import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { logoA } from "../../utils/contentConstants";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import {
  ImageDivBackground,
  showSnackBar,
  FullpageLoader,
} from "../CommonComponents";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/actions";
import { ROUTES, STRIPE_KEY } from "../../utils/api/routes";
import axios from "axios";
import sweetAlert from "sweetalert";

function Stripe({ cart, user, clearCart, shippingAddress, email, setStep }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  let order = {
    cart: cart.items,
    status: "PENDING",
    paymentMethod: "STRIPE",
    totalBill: cart.total + 150,
  };
  user && user._id
    ? (order["UserId"] = user._id)
    : (order["UserId"] = "WALK-IN CUSTOMER");

  order["shippingAddress"] = shippingAddress;

  const handleStripePayment = async (token) => {
    console.log(token);
    setLoading(true);

    try {
      const charge = await axios.post(ROUTES.PAYMENT_STRIPE, {
        token,
        amount: cart.total + 150,
      });
      console.log(charge);
      const response = await axios.post(ROUTES.NEW_ORDER, { order });
      history.push("/");
      sweetAlert({
        title: `Order # ${response.data.orderNo} Has been placed !`,
        text: "Your Order can be tracked in Orders History",
        icon: "success",
        closeOnClickOutside: false,
      });
      clearCart();
    } catch (e) {
      setLoading(true);

      console.log(e);
      showSnackBar("Fail to process your order", "error");
      setStep(1);
    }
  };

  return (
    <>
      {loading && <FullpageLoader />}
      <StripeCheckout
        name="Saro Classic"
        closed={() => setStep(1)}
        amount={parseFloat(cart.total)} //Amount in cents $9.99
        image={logoA} // the pop-in header image (default none)
        token={handleStripePayment}
        stripeKey={STRIPE_KEY}
        email={user && user.email ? user.email : email}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ width: "200px", margin: "5px" }}
          disabled={loading}
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
