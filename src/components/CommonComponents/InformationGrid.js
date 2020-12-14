import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  marginTop: {
    margin: 0,
    marginTop: theme.spacing(3),
  },
  gridFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: 25,
    paddingLeft: 25,
  },
  mainBox: {
    // backgroundColor: "#f6f6f6",
    // padding: "24px",
    // [theme.breakpoints.up("sm")]: {
    // padding: "24px 80px",
    // padding: theme.s,
    // },
  },
  imgStyle: {
    overflow: "hidden",
  },
  marginRight: {
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
}));

export default function InformationGrid({ content, reverse }) {
  const classes = useStyles();
  const { title, description, image } = content;
  return (
    // boxShadow={3}
    <Box className={`${classes.mainBox} ${classes.marginTop}`}>
      <Grid container direction={reverse ? "row-reverse" : ""}>
        <Grid item md={6} sm={12} className={classes.gridFlex}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          {/* </Box> */}
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          className={`${classes.gridFlex} ${classes.imgStyle}`}
        >
          <img src={image} width="100%" alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}
