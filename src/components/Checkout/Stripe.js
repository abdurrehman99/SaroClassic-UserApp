import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { logoA } from "../../utils/contentConstants";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { ImageDivBackground } from "../CommonComponents";
import { useHistory } from "react-router-dom";
import { addOrder } from "../../redux/actions";
import { jwtVerify } from "../../utils/jwt";
import { ROUTES } from "../../utils/api/routes";
import axios from "axios";

function Stripe({ cart: { total } }) {
  const history = useHistory();
  const handleToken = async (token) => {
    // console.log(token);
    // history.push("/success");
    try {
      const charge = await axios.post(ROUTES.PAYMENT_STRIPE_CAPTURE_URL, {
        payment: {
          amount: parseFloat(total),
          currency: "usd",
          source: token.id,
          description: "Payment",
        },
      });
      const tokenData = localStorage.getItem("infoCh");
      if (tokenData) {
        const data = jwtVerify(tokenData);
        const response = await addOrder(charge.id, "stripe", data);
        history.push("/success");
      }
    } catch (e) {
      // console.log(e);
      history.push("/failure");
    }
  };

  return (
    <StripeCheckout
      // label="Pay with Stripe" //Component button text
      panelLabel="Pay" //Submit button in modal
      amount={parseFloat(total) * 100} //Amount in cents $9.99
      image={logoA} // the pop-in header image (default none)
      token={handleToken}
      stripeKey="pk_test_TCJj0CFaEacU4W6OZmr8Bwxl00scEx4ZIT"
    >
      <Button
        variant="contained"
        color="primary"
        style={{ width: "200px", margin: "5px" }}
      >
        {/* <img src={require("../../assets/icons/stripe.png")} width="20px" /> */}
        <ImageDivBackground
          image={require("../../assets/icons/stripe.png")}
          width="20px"
          height="20px"
          borderRadius="5px"
          style={{ marginRight: "10px" }}
        />
        Pay With Stripe
      </Button>
    </StripeCheckout>
  );
}
const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(Stripe);
