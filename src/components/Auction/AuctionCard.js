import React from "react";
import { withRouter } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ImageDivBackground } from "../CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    textAlign: "center",
    margin: theme.spacing(1),
    position: "relative",
    cursor: "pointer",
    // maxHeight: "280px",
    "&:hover": {
      outline: "rgba(255,174,0,0.5) 1px solid",
      boxShadow: theme.shadows[24],
    },
  },
  cardMediaContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#f7f7f7",
  },
  cardMedia: {
    boxSizing: "border-box",
  },
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  statsContainer: {
    backgroundColor: "#f8f8f8",
    padding: theme.spacing(1),
  },
}));

function AuctionCard({ content, history: { push } }) {
  const classes = useStyles();
  //   const { title, price, img, category } = content;
  const { _id, title, description, highestBid, price, img, seller } = content;

  return (
    <Card
      className={classes.card}
      raised
      onDragStart={(e) => e.preventDefault()}
      onClick={() => push(`/auction/${_id}`)}
    >
      <Grid container>
        <Grid item xs={6} className={classes.cardMediaContainer}>
          <ImageDivBackground
            image={img[0]}
            style={{ backgroundSize: "contain" }}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>{title}</b>
                </Typography>
                {seller && seller.name ? (
                  <Typography variant="caption"> {seller.name} </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} className={classes.marginTop1}>
                <Typography variant="body2">
                  {/* {description.split(" ").splice(0, 15).join(" ") + "..."} */}
                  {description.split("").splice(0, 100).join("") + "..."}
                </Typography>
              </Grid>
              <Grid
                container
                className={`${classes.statsContainer} ${classes.marginTop1}`}
              >
                <Grid item xs={12}>
                  <Typography variant="h6">{`$${
                    highestBid ? highestBid : price
                  }`}</Typography>
                  <Typography variant="caption">Current Bid</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withRouter(AuctionCard);
