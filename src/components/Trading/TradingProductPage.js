import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";
import { Carousel, CModal } from "../CommonComponents";
import { fetchSingleProduct, buyTradingShares } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(3, 0),
  },
  gridItem: {
    padding: theme.spacing(0, 3),
  },
  sectionMarginTop: {
    marginTop: theme.spacing(1),
  },
  table: {
    "& th": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  titleBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));

function TradingProductPage({
  match: {
    params: { id },
  },
  singleProduct,
  fetchSingleProduct,
  buyTradingShares,
}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchSingleProduct(id, "trading");
  }, []);

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return singleProduct._id === id ? (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} md={4} className={classes.gridItem}>
        <Box position="sticky" top={72}>
          <Carousel
            autoPlay
            dots
            noResponsive
            content={singleProduct.img.map((_img) => {
              return (
                <div
                  style={{
                    height: "350px",
                    width: "100%",
                    backgroundImage: `url(${_img})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundColor: "#f8f8f8",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              );
            })}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} className={classes.gridItem}>
        <Box className={classes.titleBtn}>
          <div>
            <Typography variant="h5">{singleProduct.title}</Typography>
            <Typography variant="body1">
              by <b>{singleProduct.artistName}</b>
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={toggleModalOpen}
          >
            Complete Details
          </Button>
        </Box>
        <Divider className={classes.sectionMarginTop} />
        <Typography variant="body1" className={classes.sectionMarginTop}>
          <b>Description</b>
        </Typography>
        <Typography variant="body2">{singleProduct.description}</Typography>
        <Typography variant="body1" className={classes.sectionMarginTop}>
          <b>Offers</b>
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Ownership Percentage</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Buy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {singleProduct.tradingShares.map(
                ({ units, equity, percent, owner: { name, _id } }) => {
                  const row = [equity, units, percent, name];
                  return (
                    <Fragment>
                      <TableRow key={row.name}>
                        {row.map((tbcell) => (
                          <TableCell>{tbcell}</TableCell>
                        ))}
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => buyTradingShares(units, _id, id)}
                          >
                            Invest Nowbuy
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <CModal
        open={modalOpen}
        close={toggleModalOpen}
        content={singleProduct}
      />
    </Grid>
  ) : null;
}

const mapStateToProps = ({ singleProduct }) => ({ singleProduct });

export default connect(mapStateToProps, {
  fetchSingleProduct,
  buyTradingShares,
})(TradingProductPage);
