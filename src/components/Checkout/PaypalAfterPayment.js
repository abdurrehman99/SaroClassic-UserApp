import React, { useEffect } from "react";
import { FullpageLoader } from "../CommonComponents";
import axios from "axios";
import { ROUTES } from "../../utils/api/routes";
import { jwtVerify } from "../../utils/jwt";
import { addOrder } from "../../redux/actions";

export default function PaypalAfterPayment({
  history: { push },
  location: { search },
  match: {
    params: { status },
  },
}) {
  const success = async () => {
    try {
      const tokenData = localStorage.getItem("infoCh");
      if (tokenData) {
        const data = jwtVerify(tokenData);
        let response = await axios.post(
          `${ROUTES.PAYMENT_PAYPAL_SUCCESS_URL}${search}`
        );
        if (response.data.result.httpStatusCode === 200) {
          response = await addOrder(response.data.result.id, "paypal", data);
          push("/success");
        } else {
          push("/failure");
        }
      } else {
        push("/failure");
      }
    } catch (e) {
      push("/failure");
    }
  };
  useEffect(() => {
    switch (status) {
      case "success":
        success();
        break;
      case "failure":
        push("/failure");
        break;
      default:
        push("/checkout");
        break;
    }
  }, []);
  return <FullpageLoader />;
}
