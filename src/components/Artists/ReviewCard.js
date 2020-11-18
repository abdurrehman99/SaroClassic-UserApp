import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StarRateOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  flex: {
    display: "flex",
    alignItems: "center"
  },
  mainContainer: {
    // backgroundColor: "#f8f8f8",
    marginTop: theme.spacing(1),
    border: "2px solid #f8f8f8",
    padding: theme.spacing(2)
  },
  icon: {
    color: "#ffae00",
    fontSize: theme.typography.h6.fontSize
  },
  reviewBody: {
    marginTop: theme.spacing(1)
  }
}));

export default function ReviewCard() {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" className={classes.flex}>
          <b>Asad Naeem</b>
          <span className={classes.flex} style={{ marginLeft: "10px" }}>
            <StarRateOutlined className={classes.icon} /> 4.5
          </span>
        </Typography>
        <Typography variant="caption">Wed 22 April 2019</Typography>
      </Box>
      <Typography variant="body2">
        <span class="flag-icon flag-icon-pk"></span> Pakistan
      </Typography>
      <Typography variant="body2" className={classes.reviewBody}>
        Very fast delivery and accommodating to changes and suggestions. Great
        detail in the drawings!!
      </Typography>
    </Box>
  );
}
