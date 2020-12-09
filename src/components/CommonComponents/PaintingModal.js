import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Grid,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ROUTES } from "../../utils/api/routes";
import { addToCart, closeModal } from "../../redux/actions";
import { showSnackBar } from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxHeight: "80vh",
    width: "80vw",
    padding: theme.spacing(3),
    borderRadius: "0",
    "&:focus": {
      outline: "none",
    },
    overflow: "overlay",
  },
  activeSize: {
    backgroundColor: "lightGrey",
  },
  addToCartBtn: {
    padding: theme.spacing(1),
    fontSize: "0.8rem",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

function PaintingModal({ open, close, content, addToCart, closeModal }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [size, setSize] = useState("");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const selectSize = (s, i) => {
    if (i !== activeSize) {
      console.log(i);
      setActiveSize(i);
      setSize(s);
      setSizeError(false);
    } else {
      setActiveSize(null);
    }
  };

  const fillCart = () => {
    if (activeSize !== null) {
      addToCart({ ...content, size, quantity });
      console.log({ ...content, size, quantity });
      showSnackBar("Product added to Cart", "success");
      closeModal(true);
      setSizeError(false);
    } else {
      setSizeError(true);
    }
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            {content ? (
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <AliceCarousel
                    mouseTrackingEnabled
                    autoPlay
                    autoPlayInterval={3000}
                    buttonsDisabled={true}
                    key={content._id}
                  >
                    {content.images.map((_img) => (
                      <div
                        style={{
                          height: "350px",
                          width: "100%",
                          backgroundImage: `url(${_img})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundColor: "#f8f8f8",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    ))}
                  </AliceCarousel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <div className={classes.flex}>
                    <Typography variant="h5">
                      <b>{content.name}</b>
                    </Typography>
                    <Button
                      className={classes.addToCartBtn}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={fillCart}
                      disabled={content.outOfStock}
                    >
                      <AddShoppingCartIcon />
                      Add To Cart
                    </Button>
                  </div>
                  <div className={classes.flex}>
                    <Typography variant="body1">
                      <b>Price: </b>
                      <span style={{ fontSize: "1.2rem" }}>
                        Rs {content.price}
                      </span>
                    </Typography>
                    <Typography variant="body1">
                      {content.outOfStock ? (
                        <b style={{ color: "red" }}>OUT OF STOCK</b>
                      ) : (
                        <b style={{ color: "green" }}>IN STOCK</b>
                      )}
                    </Typography>
                  </div>
                  <br />
                  <Typography variant="body1">
                    <b>Product Details</b>
                    <br />
                    <br />
                    {content.description}
                    <br />
                  </Typography>
                  <br />
                  <Typography variant="body1">Size(s) Available</Typography>
                  <ButtonGroup color="secondary">
                    {JSON.parse(content.size).map((size, index) => (
                      <Button
                        className={
                          index === activeSize ? classes.activeSize : null
                        }
                        onClick={() => selectSize(size, index)}
                        key={index}
                      >
                        {size}
                      </Button>
                    ))}
                  </ButtonGroup>
                  {sizeError ? (
                    <Typography
                      variant="body2"
                      style={{ color: "red", padding: 5 }}
                    >
                      *Please Select Size
                    </Typography>
                  ) : null}
                  <Typography variant="body2">Quantity</Typography>
                  <ButtonGroup color="secondary">
                    <Button
                      onClick={() =>
                        quantity > 1 ? setQuantity(quantity - 1) : null
                      }
                    >
                      <strong>-</strong>
                    </Button>
                    <Button>{quantity}</Button>
                    <Button
                      onClick={() =>
                        quantity < 5 ? setQuantity(quantity + 1) : null
                      }
                    >
                      <strong>+</strong>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            ) : null}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect((_) => ({}), { addToCart, closeModal })(PaintingModal);
