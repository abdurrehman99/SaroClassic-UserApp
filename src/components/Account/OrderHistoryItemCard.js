import React from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
    position: "relative",
    paddingLeft: theme.spacing(2),
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    height: "100px",
    width: "100%",
  },
  gridItem: {
    padding: theme.spacing(1),
    height: "100px",
  },
  categoryOverlay: {
    position: "absolute",
    top: -9,
    left: 0,
    transformOrigin: "left",
    transform: "rotate(90deg) translateY(-50%)",
    backgroundColor: "rgba(28,28,28,0.7)",
    color: "white",
    width: "100px",
    display: "flex",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

export default function OrderHistoryItemCard({ content }) {
  const classes = useStyles();
  const history = useHistory();

  return content ? (
    <Paper
      className={classes.card}
      elevation={5}
      onClick={() => {
        history.push(
          `/${content.category === "general" ? "buyart" : content.category}/${
            content._id
          }`
        );
      }}
    >
      <Box className={classes.categoryOverlay}>
        <Typography variant="caption">
          <b>{content.category.toUpperCase()}</b>
        </Typography>
      </Box>
      <Grid container className={classes.grid}>
        <Grid item xs={2} className={classes.gridItem}>
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundImage: `url(${content.img[0]})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "5px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Grid>
        <Grid item xs={10} className={classes.gridItem}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">
              <b>{content.title}</b>
            </Typography>
            <Typography variant="body1">
              <b>${content.price} </b>x1
            </Typography>
          </Box>
          <Box height="55px" overflow="hidden">
            <Typography variant="body2">
              {content.description.split(" ").slice(0, 25).join(" ") + "..."}
            </Typography>
          </Box>
        </Grid>
        {/* <Grid
          item
          xs={2}
          className={classes.gridItem}
          style={{ display: "flex" }}
          justify="flex-end"
        >
          <Typography variant="body1">
            <b>${content.price} </b>x1
          </Typography>
        </Grid> */}
      </Grid>
    </Paper>
  ) : (
    <Typography variant="body2">Something Went Wrong!</Typography>
  );
}
