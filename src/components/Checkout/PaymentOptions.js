import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({}));

export default function PaymentOptions() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        Hello
      </Grid>
    </Grid>
  );
}
