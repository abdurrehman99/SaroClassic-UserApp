import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { FullpageLoader } from "../CommonComponents";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchArtListingAuction,
  fetchSingleProduct
} from "../../redux/actions";
import AuctionCard from "./AuctionCard";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center"
  }
}));

function AuctionProducts({
  artListingAuction,
  fetchArtListingAuction,
  filter,
  history: { push },
  match: {
    params: { id }
  }
}) {
  const classes = useStyles();
  useEffect(() => {
    fetchArtListingAuction();
  }, []);
  return (
    <Grid container className={classes.marginTop}>
      {artListingAuction.map(painting => (
        <Grid
          item
          // lg={6}
          // md={6}
          sm={6}
          xs={12}
          className={classes.gridItemStyle}
        >
          {/* <PaintingCard
            onClick={_ => push(`/auction/${painting._id}`)}
            auction
            content={painting}
          /> */}
          <AuctionCard content={painting} />
        </Grid>
      ))}
      {artListingAuction.length === 0 && <FullpageLoader />}
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    artListingAuction: state.artListing.auction,
    filter: state.artListing.filter,
    singleProduct: state.singleProduct
  };
};

export default connect(mapStateToProps, {
  fetchArtListingAuction,
  fetchSingleProduct
})(withRouter(AuctionProducts));
