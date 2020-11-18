import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import { PaintingCard2, PaintingModal, Carousel } from "../CommonComponents";

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

export default function PaintingGrid({ paintings }) {
  // const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const showProductDetails = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  return (
    <Box paddingX={3} marginTop={3}>
      <PaintingModal
        open={modalOpen}
        close={() => {
          setModalOpen(false);
        }}
        content={modalProduct}
      />
      <Typography variant="h3">Top Paintings</Typography>
      {paintings.length ? (
        <Carousel
          content={paintings.map((painting) => (
            <PaintingCard2
              content={painting}
              marginAuto
              onClick={() => showProductDetails(painting)}
            />
          ))}
        />
      ) : null}
      {/* <Grid
        container
        direction="row"
        justify="space-around"
        className={classes.marginTop}
      >
        {paintings.map(painting => (
          <Grid item md={3} sm={6} xs={12} className={classes.itemStyle}>
            <PaintingCard
              content={painting}
              onClick={_ => showProductDetails(painting)}
            />
          </Grid>
        ))}
      </Grid> */}
      {!paintings.length && (
        <Typography variant="body1" color="secondary" align="center">
          Nothing To Show.
        </Typography>
      )}
    </Box>
  );
}
