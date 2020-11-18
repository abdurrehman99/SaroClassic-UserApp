import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  Grid,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel, FullpageLoader } from "../CommonComponents";
import { fetchSingleProduct, placeBid } from "../../redux/actions";
import { ROUTES } from "../../utils/api/routes";
import Moment from "react-moment";
import { fieldValidate } from "../../utils/formValidation";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(3, 0),
  },
  sectionMarginTop: {
    marginTop: theme.spacing(1),
  },
  gridItem: {
    padding: theme.spacing(0, 3),
  },
  bidSection: {
    backgroundColor: "#f8f8f8",
    padding: theme.spacing(1, 2),
  },
  buttonStyle: {
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1),
  },
  currentBidBox: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

function AuctionProductPage({
  singleProduct,
  fetchSingleProduct,
  currentUser,
  placeBid,
}) {
  const classes = useStyles();
  const { id } = useParams();
  let loggedIn = currentUser.status === "loggedIn";
  const [bid, setBid] = useState(0);
  const [formError, setFormError] = useState({
    error: false,
    helperText: "",
  });
  const formValidation = ({ target: { value } }) => {
    setBid(value);
    let temp = fieldValidate(value, "currencyFloat");
    if (
      !temp.error &&
      parseFloat(value) <=
        parseFloat(
          singleProduct.bids.length
            ? singleProduct.bidder.highestBid
            : singleProduct.price
        )
    ) {
      temp = {
        error: true,
        helperText: "Enter value greater than current bid.",
      };
    }
    setFormError(temp);
  };
  const placeBidFn = () => {
    placeBid(id, currentUser.user._id, bid);
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id, "auction");
    }
  }, [id]);

  return (
    <Grid container className={classes.mainContainer}>
      {!singleProduct._id && singleProduct._id !== id && <FullpageLoader />}
      {singleProduct._id && singleProduct._id === id && (
        <Fragment>
          <Grid item md={4} xs={12} className={classes.gridItem}>
            <Carousel
              autoPlay
              dots
              noResponsive
              content={singleProduct.img.map((_img) => {
                return (
                  <div
                    style={{
                      height: "350px",
                      width: "100%",
                      backgroundImage: `url(${_img})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundColor: "#f8f8f8",
                      // backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              })}
            />
            {/* {singleProduct._id && (
          <AliceCarousel
            mouseTrackingEnabled
            autoPlay
            autoPlayInterval={3000}
            buttonsDisabled={true}
          >
            {singleProduct.img.map(_img => {
              return (
                <div
                  style={{
                    height: "350px",
                    width: "100%",
                    backgroundImage: `url(${_img})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat"
                  }}
                ></div>
              );
            })}
          </AliceCarousel>
        )} */}
          </Grid>
          <Grid item md={8} xs={12} className={classes.gridItem}>
            <Typography variant="h5">{singleProduct.title}</Typography>
            {singleProduct.seller && singleProduct.seller.displayName ? (
              <Typography variant="body1">
                by <b>{singleProduct.seller.displayName}</b> -{" "}
                <b>{singleProduct.seller.country}</b>
              </Typography>
            ) : null}

            <Divider className={classes.sectionMarginTop} />
            <Box
              className={`${classes.bidSection} ${classes.sectionMarginTop}`}
            >
              <Typography variant="body2">
                <b>Expires In: </b>{" "}
                <Moment interval={30000} durationFromNow>
                  {singleProduct.endDate}
                </Moment>
              </Typography>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <Typography variant="body2">
                    <b>Start Date: </b>{" "}
                    <Moment>{singleProduct.startDate}</Moment>
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="body2">
                    <b>End Date: </b> <Moment>{singleProduct.endDate}</Moment>
                  </Typography>
                </Grid>
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                className={classes.currentBidBox}
              >
                <Typography variant="h6">
                  Current Bid:
                  {` $${
                    singleProduct.bids.length
                      ? singleProduct.bidder.highestBid
                      : singleProduct.price
                  }`}
                </Typography>
                {singleProduct.bids.length ? (
                  <Typography
                    variant="body2"
                    color="secondary"
                    style={{ marginLeft: "2px" }}
                  >
                    by {singleProduct.bidder.name}
                  </Typography>
                ) : null}
              </Box>
              <TextField
                size="small"
                variant="outlined"
                helperText={
                  !loggedIn
                    ? "* Signin/signup first to place bid."
                    : formError.helperText
                }
                error={!loggedIn || formError.error}
                disabled={!loggedIn}
                value={bid}
                onChange={formValidation}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                disabled={!loggedIn || formError.error || bid === 0}
                onClick={placeBidFn}
              >
                Place Bid
              </Button>
            </Box>
            <Typography variant="body1" className={classes.sectionMarginTop}>
              <b>Description</b>
            </Typography>
            <Typography variant="body2">{singleProduct.description}</Typography>
            <Typography variant="body1" className={classes.sectionMarginTop}>
              <b>Details</b>
            </Typography>
            <Typography variant="body2">
              {singleProduct.detail &&
                Object.keys(singleProduct.detail).map((key) => (
                  <Fragment>
                    {`${key}: ${singleProduct.detail[key]}`}
                    <br />
                  </Fragment>
                ))}
              {/* {Object.keys(singleProduct.detail).map(key => (
            <h4>{key}</h4>
          ))} */}
              {/* {<h5>{typeof singleProduct.detail}</h5>} */}
            </Typography>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, { fetchSingleProduct, placeBid })(
  AuctionProductPage
);
