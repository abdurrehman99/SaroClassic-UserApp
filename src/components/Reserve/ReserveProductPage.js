import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Scrollspy from "react-scrollspy";
import {
  Grid,
  Box,
  Hidden,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel, ImageDivBackground } from "../CommonComponents";
import { fetchSingleProduct, buyEquityReserve } from "../../redux/actions";
import { ROUTES } from "../../utils/api/routes";
import { axios } from "axios";

const useStyles = makeStyles((theme) => ({
  sectionLink: {
    listStyle: "none",
    padding: theme.spacing(1, 3),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f8f8f8",
      "& a": {
        textDecoration: "none",
        fontWeight: "bold",
        color: "black",
      },
    },
    "& a": {
      textDecoration: "none",
      color: "#a3a3a3",
    },
  },
  currentSection: {
    backgroundColor: "#f8f8f8",
    "& a": {
      color: "#1c1c1c",
      // color: "white",
      fontStyle: "italic",
      fontWeight: "bold",
    },
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  navAdjust: {
    paddingTop: "75px",
    marginTop: "-75px",
  },
  contentGridItem: {
    padding: theme.spacing(0, 2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  gridItemStats: {
    margin: theme.spacing(1, 0, 0),
  },
  statsContainer: {
    backgroundColor: "#f7f7f7",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sideBar: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
  },
}));

function ReserveProductPage({
  location: { state },
  match: {
    params: { id },
  },
  fetchSingleProduct,
  singleProduct,
  buyEquityReserve,
}) {
  const classes = useStyles();
  const [nShare, setNShare] = useState(0);
  const [nShareError, setNShareError] = useState(false);

  const setNShareFn = (value) => {
    if (value < 1 || value > singleProduct.unitsLeft) {
      setNShareError(true);
    } else {
      setNShareError(false);
    }
    setNShare(value);
  };

  const buyEquity = () => {
    if (nShare < 1 || nShare > singleProduct.unitsLeft) {
      setNShareError(true);
    } else {
      buyEquityReserve(id, nShare);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id, "reserve", state);
  }, []);

  const sideBar = () => (
    <Grid md={4} xs={12} className={classes.sideBar}>
      <Grid container className={classes.statsContainer}>
        <Grid item xs={12}>
          <Typography variant="h6">Invest</Typography>
          <Typography variant="body2">
            Don't miss the chance to invest in one of the exclusive art pieces
            of AfricanArt.International
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItemStats}>
          <Typography variant="caption">Only</Typography>
          <Typography vairant="body1">
            <b>{singleProduct.unitsLeft} Shares left</b>
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridItemStats}>
          <Typography variant="h6">{singleProduct.totalUnits}</Typography>
          <Typography variant="caption">Total Shares</Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridItemStats}>
          <Typography variant="h6">{`$${singleProduct.initialOffering}`}</Typography>
          <Typography variant="caption">Initial offering.</Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridItemStats}>
          <Typography vairant="body1">${singleProduct.perUnitValue}</Typography>
          <Typography variant="caption">Per Share</Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridItemStats}>
          <Typography vairant="body1">{singleProduct.minQuantity}</Typography>
          <Typography variant="caption">Min. purchase</Typography>
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            placeholder="Number of Share"
            fullWidth
            type="number"
            variant="outlined"
            size="small"
            error={nShareError}
            helperText={
              nShareError
                ? `*Enter Value Between 1-${singleProduct.unitsLeft}`
                : ""
            }
            value={nShare}
            onChange={({ target: { value } }) => setNShareFn(value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
            onClick={buyEquity}
            disabled={nShareError}
          >
            Buy Shares
          </Button>
        </Grid>
      </Grid>
      <Box position="sticky" top={88}>
        {singleProduct.img && (
          <Carousel
            autoPlay
            dots
            noResponsive
            content={singleProduct.img.map((_img) => {
              return (
                <ImageDivBackground
                  image={_img}
                  height="300px"
                  backgroundSize="contain"
                />
              );
            })}
          />
        )}
      </Box>
    </Grid>
  );

  return (
    <Grid container className={classes.marginTop}>
      <Hidden smDown>
        <Grid item md={2}>
          <Box position="sticky" top={88}>
            <Scrollspy
              items={[
                "generalInformation",
                "historicalReturns",
                "biography",
                "media",
                "documents",
              ]}
              style={{ padding: 0 }}
              currentClassName={classes.currentSection}
            >
              <li className={classes.sectionLink}>
                <Link variant="body2" href="#generalInformation">
                  GENERAL INFROMATION
                </Link>
              </li>
              <li className={classes.sectionLink}>
                <Link variant="body2" href="#historicalReturns">
                  HISTORICAL RETURNS
                </Link>
              </li>
              <li className={classes.sectionLink}>
                <Link variant="body2" href="#biography">
                  BIOGRAPHY
                </Link>
              </li>
              <li className={classes.sectionLink}>
                <Link variant="body2" href="#media">
                  MEDIA
                </Link>
              </li>
              <li className={classes.sectionLink}>
                <Link variant="body2" href="#documents">
                  DOCUMENTS{" "}
                </Link>
              </li>
            </Scrollspy>
          </Box>
        </Grid>
      </Hidden>
      <Grid item md={6} xs={12} className={classes.contentGridItem}>
        <Typography variant="h4">{singleProduct.title}</Typography>
        <Typography variant="body2" color="primary">
          by <b>{singleProduct.artistName}</b>
        </Typography>
        <Typography variant="body2" color="primary">
          {singleProduct.aboutArtist}
        </Typography>
        <Divider className={classes.divider} />
        <Hidden mdUp>{sideBar()}</Hidden>
        <Box id="generalInformation" className={classes.navAdjust}>
          <Typography variant="h6">General Information</Typography>
          <Typography variant="body2">{singleProduct.description}</Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box id="historicalReturns" className={classes.navAdjust}>
          <Typography variant="body2"></Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box id="biography" className={classes.navAdjust}>
          <Typography variant="h6">Biography</Typography>
          <Typography variant="body2">{singleProduct.biography}</Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box id="media" className={classes.navAdjust}></Box>
        <Divider className={classes.divider} />
        <Box id="documents" className={classes.navAdjust}>
          <Typography variant="h6">Documents</Typography>
          <Typography variant="body2"></Typography>
        </Box>
      </Grid>
      <Hidden smDown>{sideBar()}</Hidden>
    </Grid>
  );
}

const mapStateToProps = ({ singleProduct }) => ({
  singleProduct,
});

export default connect(mapStateToProps, {
  fetchSingleProduct,
  buyEquityReserve,
})(ReserveProductPage);
