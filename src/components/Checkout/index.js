import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Card,
  Divider,
  CardMedia,
  CardContent,
  Button,
  Icon,
  Box,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  DeleteOutline,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  Person,
} from "@material-ui/icons";
import { ROUTES } from "../../utils/api/routes";
import { removeFromCart } from "../../redux/actions";
import {
  CountryPicker,
  showSnackBar,
  ImageDivBackground,
} from "../CommonComponents";
import { fieldValidate } from "../../utils/formValidation";
import Stripe from "./Stripe";
import Paypal from "./Paypal";
import { jwtSign } from "../../utils/jwt";
import { CryptoButton } from "./Crypto";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    // margin: 3,
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 3),
    // },
  },
  gridItem: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  gridItemCart: {
    [theme.breakpoints.down("sm")]: {
      order: -1,
    },
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
    // width: 300,
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
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  detailItemStyle: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  paymentContainer: {
    border: "5px solid #f7f7f7",
    textAlign: "center",
    padding: theme.spacing(3, 0),
  },
  buttonStyle: {
    width: "200px",
    margin: "5px",
  },
}));

function Checkout({ cart, removeFromCart, status, user, type }) {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [step, setStep] = useState(1);

  const gotoStep2 = (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      address,
      country,
      contact,
      ...(status === "loggedIn"
        ? { accountType: "user", id: user._id }
        : { accountType: "guest" }),
      total: cart.total,
      cartItems: JSON.stringify(cart.items),
    };
    // console.log(data);
    localStorage.setItem("infoCh", jwtSign(data));
    setStep(2);
  };

  // useEffect(() => {
  //   if (!cart.items.length) {
  //     setStep(1);
  //   }
  // }, [cart.items]);

  useEffect(() => {
    if (status === "loggedIn") {
      setFullName(user.name);
      setEmail(user.email);
      if (user.shippingAddress) {
        setAddress(user.shippingAddress);
      }
      if (user.country) {
        setCountry(user.country);
      }
      if (user.contact) {
        setContact(user.contact);
      }
    }
  }, [status, user]);

  switch (step) {
    case 1:
      return (
        <form onSubmit={gotoStep2}>
          <Grid container className={classes.container} justify="space-around">
            <Grid item md={5} xs={12} className={classes.gridItem}>
              <Typography variant="h5">Information</Typography>
              <Divider className={classes.marginDivider} />
              <TextField
                size="small"
                variant="outlined"
                label="Full Name"
                margin="dense"
                fullWidth
                value={fullName}
                // onChange={({ target: { value } }) => setFullName(value)}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Email"
                margin="dense"
                type="email"
                fullWidth
                value={email}
                // onChange={({ target: { value } }) => setEmail(value)}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Shipping Address"
                multiline
                rows={4}
                margin="dense"
                fullWidth
                value={address}
                onChange={({ target: { value } }) => setAddress(value)}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Contact No."
                    type="text"
                    margin="dense"
                    fullWidth
                    value={contact}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+92</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className={`${classes.gridItem} ${classes.gridItemCart}`}
            >
              <div className={classes.list} role="presentation">
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
                          Rs {cartItem.price}
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
                    <Typography variant="body1">Cart is empty.</Typography>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item md={3} xs={12} className={classes.gridItem}>
              <Typography variant="h5">Shipping & Billing</Typography>
              <Divider className={classes.marginDivider} />
              <Box className={classes.detailItemStyle}>
                <Person fontSize="small" />
                <Box ml={1}>
                  <Typography variant="body1">
                    {fullName || "-------"}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.detailItemStyle}>
                <LocationOnOutlined fontSize="small" />
                <Box ml={1}>
                  <Typography variant="body2">
                    {address || "-------"}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.detailItemStyle}>
                <PhoneOutlined fontSize="small" />
                <Box ml={1}>
                  <Typography variant="body1">
                    {`+92 ${contact}` || "-------"}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.detailItemStyle}>
                <EmailOutlined fontSize="small" />
                <Box ml={1}>
                  <Typography variant="body1">{email || "-------"}</Typography>
                </Box>
              </Box>
              <Divider className={classes.marginDivider} />
              <Card className={classes.cardTotal} raised>
                <Typography variant="body2" className={classes.subTotal}>
                  Subtotal: <b>Rs {cart.total}</b>
                </Typography>
                {/* <Typography variant="body2" color="secondary">
            *Shipping Charges will be added at checkout.
          </Typography> */}
              </Card>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                fullWidth
                disabled={!cart.items.length}
              >
                Checkout
              </Button>
              {!cart.items.length ? (
                <Typography
                  variant="body2"
                  style={{ color: "red", padding: "2px" }}
                >
                  *Fill cart to continue.
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </form>
      );
    case 2:
      return (
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} md={4} className={classes.paymentContainer}>
            <Typography variant="h5" className={classes.marginBottom}>
              Payment
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Stripe />
              <Paypal />
              <CryptoButton />
              <Button
                variant="contained"
                className={classes.buttonStyle}
                onClick={() => setStep(1)}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      );
    default:
      return null;
  }
}

const mapStateToProps = ({ cart, currentUser: { status, user } }) => ({
  cart,
  status,
  user,
});

export default connect(mapStateToProps, { removeFromCart })(Checkout);
