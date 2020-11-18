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
	Box,
} from "@material-ui/core";
import {
	Menu as MenuIcon,
	HomeOutlined,
	ShoppingBasketOutlined,
	GavelOutlined,
	ListOutlined,
	AccountBalanceOutlined,
	BrushOutlined,
	SyncAltOutlined,
	PersonOutlineOutlined,
	ShoppingCartOutlined,
	ExpandMoreOutlined,
	ExitToAppOutlined,
	StarBorderOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Cart from "./Cart";
import { SearchBar } from ".";
import { logoutUser } from "../../redux/actions";
import { logo } from "../../utils/contentConstants";

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
		padding: "5px 15px",
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
		fontSize: "16px",
		marginRight: "15px",
	},
	iconSocial: {
		// color: "#7a7a7a",
		color: "#fff",
		cursor: "pointer",
	},
	menuButton: {
		marginLeft: "2px",
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

function NavBar({ history, currentUser, logoutUser, location: { pathname } }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [navOpen, setNavOpen] = useState(false);
	const [openCart, setOpenCart] = useState(false);

	let loggedIn = currentUser.status === "loggedIn";

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

	const navMenu = () => (
		<>
			<Link className={classes.link} to="/">
				Home
			</Link>
			<Link
				className={`${classes.link} ${classes.flexLink}`}
				id="navShop"
				onClick={handleClick}
			>
				Shop
				<ExpandMoreOutlined fontSize="small" />
			</Link>
			<Menu
				id="navShop"
				anchorEl={anchorEl}
				keepMounted
				open={anchorEl && anchorEl.getAttribute("id") === "navShop"}
				onClose={handleClose}
			>
				<Link className={classes.link} to="/buyart">
					<MenuItem onClick={handleClose} className={classes.menuItem}>
						Buy Art
					</MenuItem>
				</Link>
				<Link className={classes.link} to="/masterpiece">
					<MenuItem onClick={handleClose} className={classes.menuItem}>
						Masterpieces
					</MenuItem>
				</Link>
				<Link className={classes.link} to="/auction">
					<MenuItem onClick={handleClose} className={classes.menuItem}>
						Auction
					</MenuItem>
				</Link>
			</Menu>
			<Link className={classes.link} to="/reserve">
				Reserve
			</Link>
			<Link className={classes.link} to="/artists">
				Services
			</Link>
			<Link className={classes.link} to="/trading">
				Trading
			</Link>
			<Link
				className={`${classes.link} ${classes.flexLink}`}
				id="navAccount"
				onClick={handleClick}
			>
				{loggedIn ? `Hi, ${currentUser.user.name}` : "Account"}
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
					<Link className={classes.link} to="/signin">
						<MenuItem onClick={handleClose} className={classes.menuItem}>
							Sign In
						</MenuItem>
					</Link>
				)}
				<Link className={classes.link} to={loggedIn ? "/account" : "/signin"}>
					<MenuItem onClick={handleClose} className={classes.menuItem}>
						Sign Up
					</MenuItem>
				</Link>

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

	const navMobileMenu = () => (
		<>
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/">
				<HomeOutlined className={classes.Icon} />
				Home
			</Link>
			<Divider />
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/buyart">
				<ShoppingBasketOutlined className={classes.Icon} />
				Buy Art
			</Link>
			<Divider />
			<Link
				className={`${classes.link} ${classes.linkMobile}`}
				to="/masterpiece"
			>
				<StarBorderOutlined className={classes.Icon} />
				Masterpieces
			</Link>
			<Divider />
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/auction">
				<GavelOutlined className={classes.Icon} />
				Auction
			</Link>
			<Divider />
			<Divider />
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/reserve">
				<AccountBalanceOutlined className={classes.Icon} />
				Reserve Paintings
			</Link>
			<Divider />
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/artists">
				<BrushOutlined className={classes.Icon} />
				Services
			</Link>
			<Divider />
			<Link className={`${classes.link} ${classes.linkMobile}`} to="/trading">
				<SyncAltOutlined className={classes.Icon} />
				Trading
			</Link>
			<Divider />
			{loggedIn ? (
				<Fragment>
					<Link
						className={`${classes.link} ${classes.linkMobile}`}
						to={loggedIn ? "/listandsell" : "/signin"}
					>
						<ListOutlined className={classes.Icon} />
						List & Sell
					</Link>
					<Divider />

					<Link
						className={`${classes.link} ${classes.linkMobile}`}
						to="/account"
					>
						<PersonOutlineOutlined className={classes.Icon} />
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
				<Link className={`${classes.link} ${classes.linkMobile}`} to="/signin">
					<PersonOutlineOutlined className={classes.Icon} />
					Login
				</Link>
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
					<Hidden xsDown>
						<SearchBar />
					</Hidden>
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
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpenCart(true)}
					>
						<ShoppingCartOutlined />
					</IconButton>
				</Toolbar>
				<Hidden smUp>
					<Toolbar>
						<SearchBar />
					</Toolbar>
				</Hidden>
			</AppBar>
		</Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
