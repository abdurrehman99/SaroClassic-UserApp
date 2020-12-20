import React from "react";
import { Grid, Typography, Icon, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, withRouter } from "react-router-dom";
import { footerContent } from "../../utils/contentConstants";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    margin: theme.spacing(3, 0, 0),
  },
  grid: {
    backgroundColor: "#1c1c1c",
    color: "#bdbdbd",
    textAlign: "center",
    padding: theme.spacing(5),
  },
  Icon: {
    padding: "5px 10px",
    cursor: "pointer",
  },
  Link: {
    textDecoration: "none",
    color: "#bdbdbd",
  },
}));

function Footer({ location: { pathname } }) {
  const classes = useStyles();
  const noMarginAddresses = ["/signin", "/signup", "/artists"];
  return (
    <>
      <Grid
        container
        className={`${classes.grid} ${classes.marginTop}`}
        style={{
          ...(noMarginAddresses.includes(pathname) ? { marginTop: 0 } : {}),
          ...(pathname === "/inbox" ? { display: "none" } : {}),
        }}
      >
        <Grid item sm={4} xs={12}>
          <Typography variant="body1">
            <b>Saro Classic</b>
          </Typography>
          <Typography variant="body2">Follow Us</Typography>
          <Icon
            onClick={() => window.open("https://www.facebook.com/saroclassic")}
            className={`fab fa-facebook ${classes.Icon}`}
            color="#ffffff"
          />
          <Icon
            onClick={() => window.open("https://twitter.com/saroclassic")}
            className={`fab fa-twitter ${classes.Icon}`}
            color="#ffffff"
          />
          <Icon
            onClick={() => window.open("https://www.instagram.com/saroclassic")}
            className={`fab fa-instagram ${classes.Icon}`}
            color="#ffffff"
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link className={classes.Link} to="/">
            <Typography variant="body2">Home</Typography>
          </Link>
          <Link className={classes.Link} to="/women-collection">
            <Typography variant="body2">Women's Collection</Typography>
          </Link>
          <Link className={classes.Link} to="/men-collection">
            <Typography variant="body2">Men's Collection</Typography>
          </Link>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link className={classes.Link} to="/signup">
            <Typography variant="body2">Create an Account</Typography>
          </Link>
          <Link className={classes.Link} to="/signin">
            <Typography variant="body2">Sign In</Typography>
          </Link>
          <Link className={classes.Link} to="/checkout">
            <Typography variant="body2">Go to Checkout</Typography>
          </Link>
        </Grid>
        <Divider
          style={{
            width: "100%",
            backgroundColor: "#bdbdbd",
            margin: "24px 0",
          }}
        />
        <div style={{ width: "100%" }}>
          <Typography variant="h6">{footerContent.heading}</Typography>
        </div>

        <Typography variant="body2">{footerContent.disclaimer}</Typography>
      </Grid>
    </>
  );
}

export default withRouter(Footer);
