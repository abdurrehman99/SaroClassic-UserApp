import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  SwipeableDrawer,
  Hidden,
  Divider,
  Button,
  Icon,
  Chip,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  HomeOutlined,
  LocalMall,
  ContactMail,
  Person,
  ShoppingCartOutlined,
  ExpandMoreOutlined,
  ExitToAppOutlined,
  PersonAdd,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Cart from "./Cart";
import { SearchBar } from ".";
import { logoutUser } from "../../redux/actions";
import { logo } from "../../utils/contentConstants";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-end",
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "black",
    padding: "0px 25px",
    fontFamily: "Muli",
  },
  flexLink: {
    display: "inline-flex",
    alignItems: "flex-end",
  },
  linkMobile: {
    padding: "15px",
    display: "flex",
    alignItems: "center",
  },
  list: {
    width: 300,
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
    fontSize: "18px",
    marginRight: "15px",
  },
  iconSocial: {
    // color: "#7a7a7a",
    color: "#fff",
    cursor: "pointer",
  },
  menuButton: {
    marginLeft: "1px",
  },
  menuItem: {
    fontFamily: "Muli",
  },
  navBar: {
    // maxHeight: theme.spacing(10)
  },
  secondaryNav: {
    maxHeight: theme.spacing(5),
    justifyContent: "center",
    backgroundColor: "rgba(28,28,28,0.9)",
  },
  mainNav: {
    borderBottom: "5px solid rgba(28,28,28,0.9)",
    // zIndex: 1
  },
  secondaryToolbar: {
    justifyContent: "space-between",
  },
  secondaryNavTitle: {
    flexGrow: 1,
  },
}));

function NavBar({
  cart,
  history,
  currentUser,
  logoutUser,
  location: { pathname },
}) {
  const classes = useStyles();
  const [fullName, setFullName] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  let loggedIn = currentUser.status === "loggedIn";

  useEffect(() => {
    if (currentUser.user) {
      setFullName(currentUser.user.name.split(" "));
    }
  }, [currentUser.user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavOpen(open);
  };

  const navMenu = () => {
    return (
      <>
        <Link className={classes.link} to="/">
          Home
        </Link>
        {/* <Link
          className={`${classes.link} ${classes.flexLink}`}
          id="navShop"
          onClick={handleClick}
        >
          Products
          <ExpandMoreOutlined fontSize="small" />
        </Link> */}
        {/* <Menu
          id="navShop"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl && anchorEl.getAttribute("id") === "navShop"}
          onClose={handleClose}
        >
          <Link className={classes.link} to="/allproducts">
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              All Products
            </MenuItem>
          </Link>
        </Menu> */}
        <Link className={classes.link} to="/women-collection">
          Women's Collection
        </Link>
        <Link className={classes.link} to="/men-collection">
          Men's Collection
        </Link>
        <Link
          className={`${classes.link} ${classes.flexLink}`}
          id="navAccount"
          onClick={handleClick}
        >
          {loggedIn ? `Hi, ${fullName[0]}` : "Account"}
          <ExpandMoreOutlined fontSize="small" />
        </Link>
        <Menu
          id="navAccount"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl && anchorEl.getAttribute("id") === "navAccount"}
          onClose={handleClose}
        >
          {loggedIn ? (
            <Link className={classes.link} to="/account">
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Manage Account
              </MenuItem>
            </Link>
          ) : (
            <Fragment>
              <Link className={classes.link} to="/signin">
                <MenuItem onClick={handleClose} className={classes.menuItem}>
                  Sign In
                </MenuItem>
              </Link>
              <Link
                className={classes.link}
                to={loggedIn ? "/account" : "/signup"}
              >
                <MenuItem onClick={handleClose} className={classes.menuItem}>
                  Create an account
                </MenuItem>
              </Link>
            </Fragment>
          )}

          {loggedIn && (
            <MenuItem
              onClick={() => {
                logoutUser();
                handleClose();
              }}
              className={classes.menuItem}
            >
              Logout
            </MenuItem>
          )}
        </Menu>
      </>
    );
  };

  const navMobileMenu = () => (
    <>
      <Link className={`${classes.link} ${classes.linkMobile}`} to="/">
        <HomeOutlined className={classes.Icon} />
        Home
      </Link>
      <Divider />
      <Link
        className={`${classes.link} ${classes.linkMobile}`}
        to="/women-collection"
      >
        <LocalMall className={classes.Icon} />
        Women's Collection
      </Link>
      <Divider />
      <Link
        className={`${classes.link} ${classes.linkMobile}`}
        to="/men-collection"
      >
        <LocalMall className={classes.Icon} />
        Men's Collection
      </Link>
      <Divider />
      <Link className={`${classes.link} ${classes.linkMobile}`} to="/artists">
        <ContactMail className={classes.Icon} />
        Contact Us
      </Link>
      <Divider />
      {loggedIn ? (
        <Fragment>
          <Link
            className={`${classes.link} ${classes.linkMobile}`}
            to="/account"
          >
            <Person className={classes.Icon} />
            Account
          </Link>
          <Divider />

          <Link
            className={`${classes.link} ${classes.linkMobile}`}
            onClick={() => {
              logoutUser();
              handleClose();
            }}
          >
            <ExitToAppOutlined className={classes.Icon} />
            Logout
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link
            className={`${classes.link} ${classes.linkMobile}`}
            to="/signin"
          >
            <Person className={classes.Icon} />
            Sign In
          </Link>
          <Divider />
        </Fragment>
      )}

      <Divider />
    </>
  );

  return (
    <Fragment>
      <AppBar position="sticky" color="inherit" className={classes.mainNav}>
        <Toolbar>
          <div className={classes.title}>
            <img
              alt="logo"
              src={logo}
              onClick={() => history.push("/")}
              width="130px"
            />
          </div>
          <Cart openCart={openCart} setOpenCart={setOpenCart} />
          <Hidden smDown>
            <nav>{navMenu()}</nav>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <SwipeableDrawer
            open={navOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              {/* <Typography
                variant="h5"
                className={`${classes.title} ${classes.titleMobile}`}
              >
                <b>AfricanArt International</b>
              </Typography> */}
              <div
                className={classes.title}
                style={{ justifyContent: "center" }}
              >
                <img
                  alt="logo"
                  src={logo}
                  onClick={() => history.push("/")}
                  width="120px"
                />
              </div>
              <nav className={classes.mobileNav}>{navMobileMenu()}</nav>
            </div>
          </SwipeableDrawer>
          <div style={{ padding: "0 5px", position: "relative" }}>
            {cart.length > 0 && (
              <Chip
                size="small"
                variant="outlined"
                style={{
                  position: "absolute",
                  right: 0,
                  zIndex: 100,
                }}
                label={cart.length}
              />
            )}
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenCart(true)}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    cart: state.cart.items,
  };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
