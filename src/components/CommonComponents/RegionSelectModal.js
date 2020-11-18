import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import "react-alice-carousel/lib/alice-carousel.css";
import { regionSelect } from "../../redux/actions";
import { regionSelectContent } from "../../utils/contentConstants";
import { logo } from "../../utils/contentConstants";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxHeight: "80vh",
    width: "50vw",
    [theme.breakpoints.down("md")]: {
      width: "60vw",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "70vh",

      width: "80vw",
    },
    padding: theme.spacing(3),
    borderRadius: "0",
    "&:focus": {
      outline: "none",
    },
    overflow: "overlay",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: "Dancing Script",
  },
}));

function RegionSelectModal({ regionSelect }) {
  const classes = useStyles();
  const history = useHistory();
  const [_open, setOpen] = useState(
    localStorage.getItem("popup") === "false" ? false : true
  );
  localStorage.removeItem("popup");
  const [img, setImg] = useState(0);
  const btnClick = (reg) => {
    if (localStorage.getItem("region") !== reg) {
      localStorage.setItem("popup", "false");
      localStorage.setItem("region", reg);
      window.location.reload();
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={_open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={_open}>
          <Paper className={classes.paper}>
            {/* <Typography variant="h5" className={`${classes.title}`}>
              <b>AfricanArt International</b>
            </Typography> */}
            {/* <div style={{}}></div>
            <img src={regionSelectContent.images[0]} width="100%" /> */}
            <img src={logo} width="120px" />
            <div
              style={{
                height: "300px",
                width: "100%",
                backgroundImage: `url(${regionSelectContent.images[img]})`,
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography variant="body1">Select Art Region</Typography>
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  onMouseEnter={(_) => setImg(2)}
                  onMouseLeave={(_) => setImg(0)}
                  style={{ margin: "10px" }}
                  onClick={(_) => btnClick("af")}
                >
                  African Art
                </Button>
                <Button
                  variant="outlined"
                  onMouseEnter={(_) => setImg(1)}
                  onMouseLeave={(_) => setImg(0)}
                  onClick={(_) => btnClick("int")}
                >
                  International Art
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect((_) => ({}), { regionSelect })(RegionSelectModal);
