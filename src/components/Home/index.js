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

function Home({ featuredProducts, artist }) {
  const classes = useStyles();
  const { jumbotron, historyAfricanArt, futureAfricanArt } = homePageContent;

  return (
    <Fragment>
      <Jumbotron content={jumbotron} />
      <div className={classes.mainDiv}>
        <PaintingGrid products={featuredProducts} />
        <InformationGrid content={historyAfricanArt} />
        <InformationGrid content={futureAfricanArt} reverse />
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    featuredProducts: state.products.featuredProducts,
    artist: state.artist,
  };
};

export default connect(mapStateToProps)(Home);
