import React, { Fragment } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider
} from "@material-ui/core";
import { GavelOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    margin: theme.spacing(1),
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outline: "rgba(255,174,0,0.5) 1px solid",
      boxShadow: theme.shadows[24]
    }
  },
  auctionBidCount: {
    position: "absolute",
    top: theme.spacing(3),
    left: 0,
    backgroundColor: "rgba(28,28,28,0.7)",
    color: "white",
    fontWeight: "bold",
    padding: "5px 10px"
  },
  iconStyle: {
    height: "20px",
    width: "20px",
    fontSize: "16px",
    position: "absolute",
    top: theme.spacing(3),
    right: "32px",
    background: "rgba(255,255,255,1)",
    color: "#ffae00",
    padding: "10px 5px",
    border: "#ffae00 solid 2px",
    borderTop: "none"
  },
  cardMedia: {
    objectFit: "contain",
    boxSizing: "border-box",
    padding: theme.spacing(2)
  },
  cardMedia2: {
    padding: theme.spacing(3),
    boxSizing: "border-box"
  }
}));

export default function PaintingCard({
  sm,
  auction,
  reserve,
  onClick,
  content
}) {
  const classes = useStyles();
  const imageHeight = sm ? "200px" : "300px";
  const cardWidth = sm ? "200px" : "250px";
  const { title, price, img, category } = content;

  return (
    <Card
      className={classes.card}
      raised
      style={{ maxWidth: cardWidth }}
      onClick={onClick}
      onDragStart={e => e.preventDefault()}
    >
      <CardMedia
        component="img"
        image={img[0]}
        height={imageHeight}
        className={classes.cardMedia2}
      />
      <Divider light />
      <CardContent>
        <Typography variant="body1">
          <b>{title}</b>
        </Typography>
        {!auction && (
          <Typography variant="body2">
            <b>Price:</b> {price}
          </Typography>
        )}
        {auction && (
          <Fragment>
            <Typography
              variant="caption"
              color="secondary"
              className={classes.auctionBidCount}
            >
              <GavelOutlined fontSize="inherit" /> {content.bids.length} Bids
            </Typography>
            <Typography variant="body2" color="secondary">
              <b>Current Bid:</b>{" "}
              {` $${
                // content.bids.length ? content.bidder.highestBid : content.price
                content.price
              }`}
              <br />
              <b>Time Left:</b>{" "}
              <Moment interval={30000} durationFromNow>
                {content.endDate}
              </Moment>
            </Typography>
          </Fragment>
        )}
        {reserve && (
          <Typography variant="body2" color="secondary">
            <b>Gross Return:</b> 53%
          </Typography>
        )}
        {/* {category === "masterpiece" && (
          <Icon className={`fa fa-crown ${classes.iconStyle}`} />
        )} */}
      </CardContent>
    </Card>
  );
}
