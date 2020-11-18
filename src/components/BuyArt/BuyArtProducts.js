import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import {
  PaintingCard,
  PaintingModal,
  FullpageLoader
} from "../CommonComponents";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct
} from "../../redux/actions";
import Pagination from "@material-ui/lab/Pagination";
import PaintingCard2 from "../CommonComponents/PaintingCard2";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center"
  }
}));

function BuyArtProducts({
  artListingAll,
  artListingMasterpiece,
  artListingGeneral,
  singleProduct,
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct,
  masterpiece,
  match: {
    params: { id }
  }
}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const showProductDetails = product => {
    setModalProduct(product);
    setModalOpen(true);
  };
  const fetchListing = pageNo => {
    masterpiece
      ? fetchArtListingMasterpiece(pageNo)
      : fetchArtListingGeneral(pageNo);
  };
  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);
  useEffect(() => {
    if (singleProduct._id && id) {
      showProductDetails(singleProduct);
    }
  }, [singleProduct._id]);
  useEffect(() => {
    masterpiece ? fetchArtListingMasterpiece() : fetchArtListingGeneral();
  }, [masterpiece]);
  return (
    <>
      <PaintingModal
        open={modalOpen}
        close={() => {
          setModalOpen(false);
        }}
        content={modalProduct}
      />
      <Grid container className={classes.marginTop}>
        {(masterpiece ? artListingMasterpiece : artListingGeneral).map(
          painting => (
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              className={classes.gridItemStyle}
            >
              <PaintingCard2
                onClick={_ => showProductDetails(painting)}
                content={painting}
              />
            </Grid>
          )
        )}
        <Grid xs={12}>
          <Box display="flex" justifyContent="flex-end" px={3} py={2}>
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              onChange={(e, p) => fetchListing(p)}
            />
          </Box>
        </Grid>
        {artListingAll.length === 0 && <FullpageLoader />}
      </Grid>
    </>
  );
}

const mapStateToProps = state => {
  return {
    artListingAll: state.artListing.all,
    artListingMasterpiece: state.artListing.masterpiece,
    artListingGeneral: state.artListing.general,
    singleProduct: state.singleProduct
  };
};

export default connect(mapStateToProps, {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct
})(withRouter(BuyArtProducts));
