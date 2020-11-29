import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import {
  PaintingCard2,
  PaintingModal,
  Carousel,
  Card2Loading,
} from "../CommonComponents";

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

export default function PaintingGrid({ products }) {
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
      {products.length ? (
        <Carousel
          content={products.map((product) => (
            <PaintingCard2
              content={product}
              marginAuto
              onClick={() => showProductDetails(product)}
            />
          ))}
        />
      ) : null}

      {!products.length && <Card2Loading />}
    </Box>
  );
}
