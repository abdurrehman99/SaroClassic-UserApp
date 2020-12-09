import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import {
  PaintingCard,
  PaintingModal,
  FullpageLoader,
  Card2Loading,
} from "../CommonComponents";
import { makeStyles } from "@material-ui/core/styles";
import {
  closeModal,
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct,
} from "../../redux/actions";
import Pagination from "@material-ui/lab/Pagination";
import PaintingCard2 from "../CommonComponents/PaintingCard2";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
  },
}));

function BuyArtProducts({
  artListingAll,
  artListingMasterpiece,
  allProducts,
  singleProduct,
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct,
  masterpiece,
  redux,
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const showProductDetails = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };
  const fetchListing = (pageNo) => {
    masterpiece
      ? fetchArtListingMasterpiece(pageNo)
      : fetchArtListingGeneral(pageNo);
  };
  useEffect(() => {
    setModalOpen(false);
    console.log("close modal===>", redux);
  }, [redux]);
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
        {allProducts.map((painting) => (
          <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className={classes.gridItemStyle}
          >
            <PaintingCard2
              onClick={(_) => showProductDetails(painting)}
              content={painting}
            />
          </Grid>
        ))}
        {!allProducts.length && <Card2Loading />}
        {!allProducts.length && <Card2Loading />}
        {!allProducts.length && <Card2Loading />}
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
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.products.allProducts,
    artListingAll: state.artListing.all,
    artListingMasterpiece: state.artListing.masterpiece,
    artListingGeneral: state.artListing.general,
    singleProduct: state.singleProduct,
    modal: state.modal,
    redux: state,
  };
};

export default connect(mapStateToProps, {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct,
})(withRouter(BuyArtProducts));
