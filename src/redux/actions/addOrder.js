import axios from "axios";
import { ROUTES } from "../../utils/api/routes";

export const addOrder = async (token, method, data) => {
  // console.log(data);
  let response = await axios.post(
    `${ROUTES.ORDER_ADD_ORDER}${
      data.accountType === "user" ? `?user=${data.id}` : ""
    }`,
    {
      transaction: [
        {
          token,
          method,
          amount: {
            total: data.total,
            currency: "USD",
          },
        },
      ],
      // product: data.cartItems,
      product: JSON.parse(data.cartItems).map((item) => item._id),
      shippingAddress: {
        state: data.country,
        address: data.address,
        contact: data.contact,
      },
      payer: {
        email: data.email,
        name: data.fullName,
        id: data.id,
        accountType: data.accountType,
      },
    }
  );
  return response;
};
