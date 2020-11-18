import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";
import { ImageDivBackground } from "../CommonComponents";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    textAlign: "center",
    margin: theme.spacing(1),
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outline: "rgba(255,174,0,0.5) 1px solid",
      boxShadow: theme.shadows[24]
    }
  },
  cardMediaContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#f7f7f7"
  },
  marginTop1: {
    marginTop: theme.spacing(1)
  },
  statsContainer: {
    backgroundColor: "#f8f8f8",
    padding: theme.spacing(1)
  }
}));

function TradingCard({ content, history }) {
  const classes = useStyles();
  const { _id, img, title, description, artistName, tradingShares } = content;

  return (
    <Card
      className={classes.card}
      raised
      onDragStart={e => e.preventDefault()}
      onClick={_ => history.push(`/trading/${_id}`)}
    >
      <Grid container>
        <Grid item xs={6} className={classes.cardMediaContainer}>
          <ImageDivBackground
            image={img[0]}
            style={{ backgroundSize: "contain", minHeight: "200px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>{title}</b>
                </Typography>
                <Typography variant="caption">{artistName}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.marginTop1}>
                <Typography variant="body2">
                  {`${description
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}...`}
                </Typography>
              </Grid>
              <Grid
                container
                className={`${classes.statsContainer} ${classes.marginTop1}`}
              >
                <Grid item xs={12}>
                  <Typography variant="h6">{tradingShares.length}</Typography>
                  <Typography variant="caption">Listings For Sale</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withRouter(TradingCard);
