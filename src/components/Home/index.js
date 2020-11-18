import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Jumbotron, InformationGrid } from "../CommonComponents";
// import ArtistGrid from "./ArtistGrid";
import { homePageContent } from "../../utils/contentConstants";
import PaintingGrid from "./PaintingGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainDiv: {
    margin: theme.spacing(3),
  },
}));

function Home({ artListingAll, artist }) {
  const classes = useStyles();
  const {
    jumbotron,
    historyAfricanArt,
    essenceAfricanArt,
    futureAfricanArt,
    whoAreWe,
    // whyUs,
  } = homePageContent;

  return (
    <Fragment>
      <Jumbotron content={jumbotron} />
      <div className={classes.mainDiv}>
        <PaintingGrid paintings={artListingAll} />
        <InformationGrid content={historyAfricanArt} />
        <InformationGrid content={futureAfricanArt} reverse />
        <InformationGrid content={essenceAfricanArt} />
        <InformationGrid content={whoAreWe} reverse />
        {/* <InformationGrid content={whyUs} /> */}
        {/* <ArtistGrid artist={artist} /> */}
        {/* {artListingAll.length != 0 && <PaintingGrid paintings={artListingAll} />} */}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    artListingAll: state.artListing.all,
    artist: state.artist,
  };
};

export default connect(mapStateToProps)(Home);
