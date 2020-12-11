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
          <Icon className={`fab fa-twitter ${classes.Icon}`} color="#ffffff" />
          <Icon
            className={`fab fa-instagram ${classes.Icon}`}
            color="#ffffff"
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link className={classes.Link} to="/">
            <Typography variant="body2">Home</Typography>
          </Link>
          <Link className={classes.Link} to="/buyart">
            <Typography variant="body2">Buy Art</Typography>
          </Link>
          <Link className={classes.Link} to="/masterpiece">
            <Typography variant="body2">Masterpieces</Typography>
          </Link>
          <Link className={classes.Link} to="/auction">
            <Typography variant="body2">Auction</Typography>
          </Link>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link className={classes.Link} to="/reserve">
            <Typography variant="body2">Reserve</Typography>
          </Link>
          <Link className={classes.Link} to="/artists">
            <Typography variant="body2">Services</Typography>
          </Link>
          <Link className={classes.Link} to="/trading">
            <Typography variant="body2">Trading</Typography>
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
