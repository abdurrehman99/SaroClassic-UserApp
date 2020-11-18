import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  Divider
} from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { addToCart } from "../../redux/actions";
import { showSnackBar } from "./SnackBar";
import { ROUTES } from "../../utils/api/routes";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    maxHeight: "80vh",
    width: "80vw",
    padding: theme.spacing(3),
    borderRadius: "0",
    "&:focus": {
      outline: "none"
    },
    overflow: "overlay"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

export default function CModal({ open, close, content }) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          {content && (
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <AliceCarousel
                  mouseTrackingEnabled
                  autoPlay
                  autoPlayInterval={3000}
                  buttonsDisabled={true}
                >
                  {content.img.map(_img => (
                    <div
                      style={{
                        height: "350px",
                        width: "100%",
                        backgroundImage: `url(${_img})`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundColor: "#f8f8f8",
                        backgroundRepeat: "no-repeat"
                      }}
                    ></div>
                  ))}
                </AliceCarousel>
              </Grid>
              <Grid item md={8} xs={12}>
                <Typography variant="h4">{content.title}</Typography>
                <Typography variant="body2" color="primary">
                  by <b>{content.artistName}</b>
                </Typography>
                <Typography variant="body2" color="primary">
                  {content.aboutArtist}
                </Typography>
                <Divider className={classes.divider} />
                <Box id="generalInformation" className={classes.navAdjust}>
                  <Typography variant="h6">General Information</Typography>
                  <Typography variant="body2">{content.description}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box id="historicalReturns" className={classes.navAdjust}>
                  <Typography variant="body2"></Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box id="biography" className={classes.navAdjust}>
                  <Typography variant="h6">Biography</Typography>
                  <Typography variant="body2">{content.biography}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box id="media" className={classes.navAdjust}></Box>
                <Divider className={classes.divider} />
                <Box id="documents" className={classes.navAdjust}>
                  <Typography variant="h6">Documents</Typography>
                  <Typography variant="body2"></Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
}
