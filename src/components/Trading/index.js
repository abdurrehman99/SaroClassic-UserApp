import React, { Fragment, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Jumbotron } from "../CommonComponents";
import { tradingPageContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/core/styles";
import TradingCard from "./TradingCard";
import TradingProductPage from "./TradingProductPage";
import { connect } from "react-redux";
import { fetchArtListingTrading } from "../../redux/actions";
import { ArrowForwardIosOutlined } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  pageContainer: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
  },
  tradeBar: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    backgroundColor: "#1c1c1c",
    borderRadius: "5px",
    padding: theme.spacing(2, 3),
    margin: theme.spacing(1),
  },
}));

function Trading({ history, tradingListing, fetchArtListingTrading }) {
  const classes = useStyles();
  useEffect(() => {
    fetchArtListingTrading();
  }, []);

  // const paypalCheck = async () => {
  //   const response = await axios.post(
  //     "https://africanart-international-serve.herokuapp.com/paypal/createPayment",
  //     {
  //       payment: {
  //         amount: 123,
  //         currency: "usd",
  //       },
  //     }
  //   );
  //   console.log(response);
  // };

  return (
    <Fragment>
      <Jumbotron content={tradingPageContent.jumbotron} />
      <Grid container className={classes.pageContainer}>
        <Grid item xs={12}>
          <Box className={classes.tradeBar}>
            <Typography variant="h6">Trade Your Shares</Typography>
            <Button
              variant="contained"
              onClick={() =>
                history.push("/account", { section: "myReserveInvestments" })
              }
            >
              Sell
              <ArrowForwardIosOutlined fontSize="inherit" />
            </Button>
          </Box>
        </Grid>
        {tradingListing.map((tradingItem) => (
          <Grid item md={6} xs={12} className={classes.gridItemStyle}>
            <TradingCard content={tradingItem} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = ({ artListing: { trading } }) => ({
  tradingListing: trading,
});

export default connect(mapStateToProps, { fetchArtListingTrading })(Trading);

export { TradingProductPage };
