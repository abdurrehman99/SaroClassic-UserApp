import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { clearCart } from "../../redux/actions";

function Success({ clearCart }) {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box textAlign="center" mt={3} py={10}>
      <FavoriteBorderOutlined fontSize="large" />
      <Typography variant="h5">Order Placed Successfully</Typography>
    </Box>
  );
}

export default connect(() => ({}), { clearCart })(Success);
