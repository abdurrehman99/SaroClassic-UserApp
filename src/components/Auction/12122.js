import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  Typography,
  Divider,
  Grid
} from "@material-ui/core";
import { GavelOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";

import { sampleImages } from "../../utils/contentConstants";

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    margin: theme.spacing(1),
    position: "relative",
    cursor: "pointer"
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
    padding: theme.spacing(3),
    boxSizing: "border-box"
  },
  marginTop1: {
    marginTop: theme.spacing(1)
  },
  statsContainer: {
    backgroundColor: "#f8f8f8",
    padding: theme.spacing(1)
  }
}));

export default function AuctionCard({ content, sm, history }) {
  const classes = useStyles();
  const imageHeight = sm ? "200px" : "300px";
  const cardWidth = sm ? "300px" : "350px";
  //   const { title, price, img, category } = content;

  return (
    <Card
      className={classes.card}
      raised
      style={{ maxWidth: cardWidth }}
      onDragStart={e => e.preventDefault()}
      // onClick={_ => history.push("/reserve/test")}
    >
      <CardMedia
        component="img"
        // image={img[0]}
        image={sampleImages[0]}
        height={imageHeight}
        className={classes.cardMedia}
      />
      <Divider light />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">
              <b>Claude Monet</b>
            </Typography>
            <Typography variant="caption">COUP DE VENT · 1881</Typography>
          </Grid>
          <Grid item xs={12} className={classes.marginTop1}>
            <Typography variant="body2">
              With the lowest volatility of any blue-chip artist, this work
              carried an appraisal of $8,500,000 prior to Masterworks’ purchase
              on June 20, 2018.
            </Typography>
          </Grid>
          <Grid
            container
            className={`${classes.statsContainer} ${classes.marginTop1}`}
          >
            <Grid item xs={6}>
              <Typography variant="h6">13.60%</Typography>
              <Typography variant="caption">
                Gross Return of similar works.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">$1,188,760</Typography>
              <Typography variant="caption">Initial offering.</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.marginTop1}>
            <Button variant="outlined" color="primary" fullWidth>
              MORE INFO
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// export default withRouter
