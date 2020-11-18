import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Jumbotron, Filter } from "../CommonComponents";
import { buyArtContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchArtListingAuction,
  fetchSingleProduct
} from "../../redux/actions";
import AuctionProducts from "./AuctionProducts";
import AuctionProductPage from "./AuctionProductPage";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Auction({
  singleProduct,
  filter,
  match: {
    params: { id }
  }
}) {
  const classes = useStyles();
  return (
    <>
      <Jumbotron content={buyArtContent.general.jumbotron} />
      <Grid container>
        <Grid item md={3} xs={12} className={classes.marginTop}>
          <Filter filter={filter} page="auction" />
        </Grid>
        <Grid item md={9} xs={12}>
          <AuctionProducts />
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = state => {
  return {
    filter: state.artListing.filter,
    singleProduct: state.singleProduct
  };
};

export default connect(mapStateToProps, {
  fetchArtListingAuction,
  fetchSingleProduct
})(Auction);

export { AuctionProductPage };
