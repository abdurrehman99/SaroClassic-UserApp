import React, { Fragment, useEffect } from "react";
import { Typography } from "@material-ui/core";
import OrderHistoryItem from "./OrderHistoryItem";
import { connect } from "react-redux";
import { userOrders } from "../../redux/actions";

function OrderHistory({ userOrdersData, userOrders, user }) {
  useEffect(() => {
    userOrders(user._id);
  }, []);

  return (
    <Fragment>
      <Typography variant="h6">
        <b>Order History</b>
      </Typography>
      {userOrdersData.map((item) => (
        <OrderHistoryItem content={item} />
      ))}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userOrdersData: state.userOrders,
    user: state.currentUser.user,
  };
};

export default connect(mapStateToProps, { userOrders })(OrderHistory);
