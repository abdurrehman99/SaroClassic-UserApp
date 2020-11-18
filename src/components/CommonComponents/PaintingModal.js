import React, { Fragment } from "react";
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
} from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ROUTES } from "../../utils/api/routes";
import { addToCart } from "../../redux/actions";
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
	flex: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: theme.spacing(2),
	},
}));

function PaintingModal({ open, close, content, addToCart }) {
	const classes = useStyles();
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
						{content && (
							<Grid container spacing={3}>
								<Grid item md={5} xs={12}>
									<AliceCarousel
										mouseTrackingEnabled
										autoPlay
										autoPlayInterval={3000}
										buttonsDisabled={true}
										key={content._id}
									>
										{content.img.map((_img) => (
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
											<b>{content.title}</b>
										</Typography>
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={(_) => {
												addToCart(content);
												console.log(content);
												showSnackBar("Product added to Cart.", "success");
											}}
										>
											Add To Cart
										</Button>
									</div>
									<Typography variant="body1">
										<b>Price: </b>
										<span style={{ fontSize: "1.5rem" }}>${content.price}</span>
									</Typography>
									<br />
									<Typography variant="body2">
										{content.description}
										<br />
										<br />
										<b>Product Details</b>
										<br />
										{content.detail &&
											Object.keys(content.detail).map((key) => (
												<Fragment>
													{`${capitalizeFirstLetter(key)}: ${
														content.detail[key]
													}`}
													<br />
												</Fragment>
											))}
									</Typography>
								</Grid>
							</Grid>
						)}
					</Paper>
				</Fade>
			</Modal>
		</div>
	);
}

export default connect((_) => ({}), { addToCart })(PaintingModal);
