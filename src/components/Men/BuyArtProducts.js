import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
} from "@material-ui/core";
import {
  PaintingCard,
  PaintingModal,
  FullpageLoader,
  Card2Loading,
} from "../CommonComponents";
import { makeStyles } from "@material-ui/core/styles";
import Delete from "@material-ui/icons/Close";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
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
  menProducts,
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  masterpiece,
  category,
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [AllFProducts, setAllFProducts] = useState([]);
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
    setAllFProducts(menProducts);
  }, [menProducts]);

  const searchItems = (value) => {
    setSearch(value);
    let filtered = menProducts.filter((e) =>
      e.name.toLowerCase().includes(value)
    );
    setAllFProducts(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setAllFProducts(menProducts);
  };

  useEffect(() => {
    console.log("category for filter", category);
    if (category === "CLEAR") setAllFProducts(menProducts);
    else {
      let filtered = menProducts.filter((e) => e.category === category);
      setAllFProducts(filtered);
    }
  }, [category]);

  return (
    <>
      <PaintingModal
        open={modalOpen}
        close={() => {
          setModalOpen(false);
        }}
        content={modalProduct}
      />
      <TextField
        style={{ marginTop: 20 }}
        placeholder="Search by name"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => searchItems(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch}>
                <Delete />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container className={classes.marginTop}>
        {AllFProducts.map((painting) => (
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
        {!menProducts.length && <Card2Loading />}
        {!menProducts.length && <Card2Loading />}
        {!menProducts.length && <Card2Loading />}
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
    menProducts: state.products.menProducts,
    artListingAll: state.artListing.all,
    artListingMasterpiece: state.artListing.masterpiece,
    artListingGeneral: state.artListing.general,
    singleProduct: state.singleProduct,
  };
};

export default connect(mapStateToProps, {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchSingleProduct,
})(withRouter(BuyArtProducts));
