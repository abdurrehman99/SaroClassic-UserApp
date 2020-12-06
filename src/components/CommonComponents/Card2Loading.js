import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

function Media(props) {
  return (
    <Grid container>
      <Box width={300} marginRight={5} my={5}>
        <Skeleton variant="rect" width={300} height={150} />
        <Skeleton />
        <Skeleton width={150} />
      </Box>
      <Box width={300} marginRight={5} my={5}>
        <Skeleton variant="rect" width={300} height={150} />
        <Skeleton />
        <Skeleton width={150} />
      </Box>
      <Box width={300} marginRight={5} my={5}>
        <Skeleton variant="rect" width={300} height={150} />
        <Skeleton />
        <Skeleton width={150} />
      </Box>
      <Box width={300} marginRight={5} my={5}>
        <Skeleton variant="rect" width={300} height={150} />
        <Skeleton />
        <Skeleton width={150} />
      </Box>
    </Grid>
  );
}

export default function Card2Loading() {
  return (
    <Box overflow="hidden">
      <Media />
    </Box>
  );
}
