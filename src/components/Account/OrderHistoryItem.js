import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import OrderHistoryItemCard from "./OrderHistoryItemCard";

const useStyles = makeStyles((theme) => ({
  card: {
    // maxHeight: "100px",
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
    //   height: "30px",
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
      {/* <Grid container className={classes.cardTop}>
        <Grid item xs={6}>
          <Typography variant="body2">Order Number: #1239A0</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Total: $30290</Typography>
        </Grid>
      </Grid> */}
      <Box className={classes.cardTop}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Order Number: #{content._id}</Typography>
          <Typography variant="body2">
            Total: <b>${content.transaction[0].amount.total}</b>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">
            {/* Placed on: {Date(content.createdAt).toString()} */}
            Placed on: {new Date(content.createdAt).toString()}
          </Typography>
          <Typography variant="body2">
            Status: <b>{content.status ? "true" : "false"}</b>
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="body2" style={{ margin: "0 10px 0 0" }}>
            {/* Placed on: {Date(content.createdAt).toString()} */}
            Shipped: <b>{content.tracking.shipped ? "true" : "false"}</b>
          </Typography>
          <Typography variant="body2">
            Delivered: <b>{content.tracking.delivered ? "true" : "false"}</b>
          </Typography>
        </Box>
      </Box>
      {/* <Box className={classes.cardTop}>
        <Typography variant="body2">Order Number: #1239A0</Typography>
      </Box> */}
      <Box p={2}>
        {/* {JSON.parse(content.product).map((item) => (
          <OrderHistoryItemCard content={item} />
        ))} */}
        {content.product.map((item) => {
          // console.log(item);
          return <OrderHistoryItemCard content={item} />;
        })}
      </Box>
    </Paper>
  );
}
