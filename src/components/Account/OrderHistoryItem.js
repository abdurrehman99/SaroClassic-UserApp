import React from "react";
import { Paper, Typography, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import OrderHistoryItemCard from "./OrderHistoryItemCard";

const useStyles = makeStyles((theme) => ({
  card: {
    // maxHeight: "500px",
    marginBottom: theme.spacing(1),
  },
  //   grid: {
  //     display: "flex",
  //     height: "100px",
  //     width: "100%"
  //   },
  //   gridItem: {
  //     padding: theme.spacing(1)
  //   },
  cardTop: {
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    padding: theme.spacing(1, 2),
    color: "white",
  },
}));

export default function OrderHistoryItem({ content }) {
  const classes = useStyles();
  return (
    <Paper className={classes.card} elevation={5}>
      <Box className={classes.cardTop}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">
            Order Number # <b>{content.orderNo}</b>
          </Typography>
          <Typography variant="body2">
            Total Amount: <b>{content.totalBill} PKR</b>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">
            Placed on: {content.orderDate}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="body2" style={{ margin: "0 10px 0 0" }}>
            Status: <b>{content.status}</b>
          </Typography>
        </Box>
      </Box>
      <Box p={2}>
        {content.cart.map((item) => {
          // console.log(item);
          return <OrderHistoryItemCard content={item} />;
        })}
      </Box>
    </Paper>
  );
}
