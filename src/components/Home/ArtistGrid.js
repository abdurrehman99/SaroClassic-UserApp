import React from "react";
import { Box, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
// import { ArtistCard } from "../CommonComponents";
import { Carousel } from "../CommonComponents";
import ArtistCard from "../Artists/ArtistCard";

// const useStyles = makeStyles(theme => ({
//   marginTop: {
//     margin: 0,
//     marginTop: theme.spacing(3)
//   },
//   itemStyle: {
//     display: "flex",
//     justifyContent: "center"
//   }
// }));

export default function ArtistGrid({ artist }) {
  // const classes = useStyles();
  // style={{ backgroundColor: "#f6f6f6" }}
  return (
    <Box paddingX={3} marginTop={3}>
      <Typography variant="h3">Artist</Typography>
      {/* <Grid
        container
        direction="row"
        justify="space-around"
        className={classes.marginTop}
      > */}
      {/* {artist.map(_artist => (
          <Grid item md={3} sm={6} xs={12} className={classes.itemStyle}>
            <ArtistCard content={_artist} />
          </Grid>
        ))} */}
      {artist.length ? (
        <Carousel
          content={artist.map(_artist => (
            // <ArtistCard content={_artist} />
            <div style={{ padding: "0 15px" }}>
              <ArtistCard content={_artist} />
            </div>
          ))}
        />
      ) : null}
      {!artist.length && (
        <Typography variant="body1" color="secondary" align="center">
          Nothing To Show.
        </Typography>
      )}
    </Box>
  );
}
