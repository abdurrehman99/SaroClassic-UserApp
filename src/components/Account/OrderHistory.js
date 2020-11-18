import React, { Fragment, useEffect } from "react";
import { Typography } from "@material-ui/core";
import OrderHistoryItem from "./OrderHistoryItem";
import { connect } from "react-redux";
import { userOrders } from "../../redux/actions";

function OrderHistory({ userOrdersData, userOrders }) {
  useEffect(() => {
    userOrders();
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

const mapStateToProps = ({ userOrders }) => ({ userOrdersData: userOrders });

export default connect(mapStateToProps, { userOrders })(OrderHistory);
