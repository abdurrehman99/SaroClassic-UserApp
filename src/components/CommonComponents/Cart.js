import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Typography,
  SwipeableDrawer,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DeleteOutline } from "@material-ui/icons";
import { ROUTES } from "../../utils/api/routes";
import { removeFromCart } from "../../redux/actions";
import { showSnackBar } from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Muli",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    padding: "5px 15px",
    fontFamily: "Muli",
  },
  linkMobile: {
    padding: "15px",
    display: "flex",
    alignItems: "center",
  },
  list: {
    width: 290,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
  },
  titleMobile: {
    textAlign: "center",
    padding: "20px 0",
  },
  Icon: {
    fontSize: "16px",
    marginRight: "15px",
  },
  cardStyle: {
    display: "flex",
    alignItems: "stretch",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: "relative",
  },
  cardContent: {
    flex: 2,
  },
  cardMedia: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  cardTotal: {
    display: "flex",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subTotal: {
    marginRight: theme.spacing(1),
  },
  marginDivider: {
    margin: theme.spacing(2, 0),
  },
  deleteIcon: {
    cursor: "pointer",
  },
  borderMasterpiece: {
    border: "2px #ffae00 solid",
  },
  iconStyle: {
    fontSize: "16px",
    position: "absolute",
    width: "auto",
    top: "0",
    left: "0",
    padding: "5px",
    backgroundColor: "white",
    color: "#ffae00",
  },
}));

function Cart({
  history,
  openCart,
  setOpenCart,
  cart,
  totalCart,
  removeFromCart,
}) {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenCart(open);
  };

  return (
    <SwipeableDrawer
      open={openCart}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      anchor="right"
    >
      <div className={classes.list}>
        <Typography variant="h5">Cart</Typography>
        <Divider className={classes.marginDivider} />
        <div className={classes.productList}>
          {cart.items.map((cartItem) => (
            <Card
              className={`${classes.cardStyle} ${
                cartItem.category === "masterpiece"
                  ? classes.borderMasterpiece
                  : null
              }`}
              raised
            >
              <CardMedia
                image={cartItem.images[0]}
                className={classes.cardMedia}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body2">{cartItem.name}</Typography>
                <Typography variant="body2" color="secondary">
                  ${cartItem.price}
                </Typography>
              </CardContent>
              <DeleteOutline
                onClick={() => {
                  removeFromCart(cartItem);
                  showSnackBar("Item Removed.", "success");
                }}
                className={classes.deleteIcon}
              />
              {cartItem.category === "masterpiece" && (
                <Icon className={`fa fa-crown ${classes.iconStyle}`} />
              )}
            </Card>
          ))}
          {cart.items.length === 0 && (
            <Typography variant="body1">Your Cart is empty</Typography>
          )}
        </div>
        <Divider className={classes.marginDivider} />
        <Card className={classes.cardTotal} raised>
          <Typography variant="body1" className={classes.subTotal}>
            Subtotal : Rs <b>{cart.total}</b>
          </Typography>
        </Card>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          disabled={!cart.items.length}
          onClick={() => history.push("/checkout")}
        >
          Checkout
        </Button>
        {!cart.items.length ? (
          <Typography variant="body2" style={{ color: "red", padding: "5px" }}>
            *Cart is Empty !
          </Typography>
        ) : null}
      </div>
    </SwipeableDrawer>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart })(withRouter(Cart));
