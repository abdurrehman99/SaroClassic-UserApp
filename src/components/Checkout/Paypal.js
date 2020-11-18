import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { ImageDivBackground } from "../CommonComponents";
import axios from "axios";
import { ROUTES } from "../../utils/api/routes";

function Paypal({ cart }) {
  const fetchPaymentUrl = async () => {
    const response = await axios.post(
      `${ROUTES.PAYMENT_PAYPAL_GET_PAYMENT_URL}`,
      {
        amount: parseFloat(cart.total),
        currency: "usd",
      }
    );
    window.location.replace(response.data.result);
  };
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ width: "200px", margin: "5px" }}
      onClick={fetchPaymentUrl}
    >
      <ImageDivBackground
        image={require("../../assets/icons/paypal.webp")}
        width="20px"
        height="20px"
        borderRadius="5px"
        style={{ marginRight: "10px" }}
      />
      Pay with paypal
    </Button>
  );
}
const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(Paypal);
