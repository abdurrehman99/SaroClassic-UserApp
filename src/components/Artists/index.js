import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Box, Container, Button } from "@material-ui/core";
import { ImageDivBackground } from "../CommonComponents";
import { servicesPageContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/core/styles";
import { fetchArtist } from "../../redux/actions";
import ArtistPage from "./ArtistPage";
import BookNow from "./BookNow";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  pageContainer: {
    // marginTop: theme.spacing(3),
    // [theme.breakpoints.up("sm")]: {
    //   padding: theme.spacing(0, 3)
    // }
    position: "relative",
    height: "70vh",
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
  },
  overlayBox: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 3),
  },
}));

function Artists({ history: { push }, fetchArtist, artist }) {
  const classes = useStyles();
  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <Fragment>
      {/* <Jumbotron content={servicesPageContent.jumbotron} /> */}
      <Grid container className={classes.pageContainer}>
        {/* <Grid container> */}
        <Box className={classes.overlayBox}>
          <Container>
            <Typography variant="h3">
              Starting from just <b>$100</b>
            </Typography>
            <Typography variant="h5">
              Have your portraits hand painted by top class artists engaged by
              us.
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={(_) => push("/artists/booknow")}
            >
              Book Now
            </Button>
          </Container>
        </Box>
        <Grid item xs={6}>
          <ImageDivBackground image={servicesPageContent.images[4]} />
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={6}>
            <ImageDivBackground
              image={servicesPageContent.images[0]}
              height="50%"
            />
            <ImageDivBackground
              image={servicesPageContent.images[3]}
              height="50%"
            />
          </Grid>
          <Grid item xs={6}>
            <ImageDivBackground image={servicesPageContent.images[1]} />
          </Grid>
        </Grid>
        {/* {artist.map(singleArtist => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={classes.gridItemStyle}
          >
            <ArtistCard content={singleArtist} />
          </Grid>
        ))} */}
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  artist: state.artist,
});

export default connect(mapStateToProps, { fetchArtist })(Artists);

export { ArtistPage, BookNow };
