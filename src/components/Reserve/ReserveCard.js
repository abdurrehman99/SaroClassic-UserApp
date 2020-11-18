import React from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Divider,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";

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
    padding: theme.spacing(1, 0)
  },
  dividerStyle: {
    width: "100%",
    margin: theme.spacing(1, 0)
  }
}));

function ReserveCard({ content, sm, history }) {
  const classes = useStyles();
  const imageHeight = sm ? "200px" : "300px";
  const cardWidth = sm ? "300px" : "350px";
  const {
    _id,
    img,
    title,
    description,
    artistName,
    initialOffering,
    totalUnits,
    perUnitValue,
    minQuantity,
    unitsLeft
    // grossReturn
  } = content;

  return (
    <Card
      className={classes.card}
      raised
      style={{ maxWidth: cardWidth }}
      onDragStart={e => e.preventDefault()}
      onClick={_ => history.push(`/reserve/${_id}`, content)}
    >
      <CardMedia
        component="img"
        image={img[0]}
        height={imageHeight}
        className={classes.cardMedia}
      />
      <Divider light />
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
              {description
                .split(" ")
                .splice(0, 20)
                .join(" ") + "..."}
            </Typography>
          </Grid>
          <Grid
            container
            className={`${classes.statsContainer} ${classes.marginTop1}`}
          >
            <Grid item xs={12}>
              <Typography vairant="body1">
                <b>{unitsLeft} Shares left</b>
              </Typography>
            </Grid>
            <Divider
              orientation="horizontal"
              className={classes.dividerStyle}
            />
            <Grid item xs={6}>
              <Typography variant="h6">{totalUnits}</Typography>
              <Typography variant="caption">Total Shares</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{`$${initialOffering}`}</Typography>
              <Typography variant="caption">Initial offering.</Typography>
            </Grid>
            <Divider
              orientation="horizontal"
              className={classes.dividerStyle}
            />
            <Grid item xs={6}>
              <Typography vairant="body1">${perUnitValue}</Typography>
              <Typography variant="caption">Per Share</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography vairant="body1">{minQuantity}</Typography>
              <Typography variant="caption">Min. purchase</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.marginTop1}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={_ => history.push(`/reserve/${_id}`, content)}
            >
              MORE INFO
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withRouter(ReserveCard);
