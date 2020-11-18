import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  StarRateOutlined,
  LocationOnOutlined,
  PersonOutlineOutlined
} from "@material-ui/icons";
import { ReactPhotoCollage } from "react-photo-collage";
import ReviewCard from "./ReviewCard";
import { fetchSingleArtist } from "../../redux/actions";
import { ROUTES } from "../../utils/api/routes";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
  pageContainer: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3)
    }
  },
  avatar: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxShadow: theme.shadows[8]
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    color: "#ffae00",
    fontSize: theme.typography.h6.fontSize
  },
  sectionPadding: {
    padding: theme.spacing(3)
  },
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginTop1: {
    marginTop: theme.spacing(1)
  },
  divider: {
    width: "80%",
    margin: "auto"
  },
  paddingleftTop: {
    padding: theme.spacing(3, 0, 0, 3)
  }
}));

// const setting = {
//   //   width: "600px",
//   width: "100%",
//   //   height: ["250px", "170px"],
//   height: ["70vh"],
//   layout: [2, 4],
//   // photos: sampleImages.map(img => ({ src: img })),
//   photos: [
//     {
//       src:
//         "https://africanart-international-serve.herokuapp.com/static/img/1842184261c2567aa6fa7b66fb9d0b4c.jpeg"
//     }
//   ],
//   showNumOfRemainingPhotos: true
// };

function ArtistPage({
  location: { state },
  match: {
    params: { id }
  },
  artist,
  fetchSingleArtist
}) {
  const classes = useStyles();
  const [portfolio, setPortfolio] = useState([]);
  const layout = n => {
    switch ((n = portfolio.length)) {
      case 1:
        return [1];
      case 2:
        return [2];
      case 3:
        return [3];
      case 4:
        return [2, 2];
      case 5:
        return [2, 3];
      default:
        return [2, 4];
    }
  };

  let setting = {
    width: "100%",
    height: ["70vh"],
    // layout: [2, 4],
    showNumOfRemainingPhotos: true
  };
  useEffect(() => {
    fetchSingleArtist(id, state);
  }, []);
  useEffect(() => {
    if (artist.portfolioImg) {
      setPortfolio(
        artist.portfolioImg.map(img => ({
          src: img
        }))
      );
    }
  }, [artist.portfolioImg]);

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={3}>
        {/* <Box position="sticky" top={72}> */}
        <Paper elevation={8}>
          <Box p={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <div
                className={classes.avatar}
                style={{
                  backgroundImage: `url(${artist.img})`
                }}
              ></div>
              <Box py={2} textAlign="center">
                <Typography variant="body1">
                  <b>{artist.name}</b>
                </Typography>
                <Typography variant="body2" className={classes.flex}>
                  <StarRateOutlined className={classes.icon} />{" "}
                  {artist.avgRating} (505 Orders)
                </Typography>
              </Box>
              <Divider className={classes.divider} />
            </Box>
            <Box pt={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <LocationOnOutlined className={classes.icon} /> From
                </Typography>
                <Typography variant="body2">
                  <b>{artist.country}</b>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <PersonOutlineOutlined className={classes.icon} /> Member
                  Since
                </Typography>
                <Typography variant="body2">
                  <b>
                    <Moment format="DD MMM YYYY">{artist.createdAt}</Moment>
                  </b>
                </Typography>
              </Box>
              {/* <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <LocationOnOutlined className={classes.icon} /> From
                </Typography>
                <Typography variant="body2">
                  <b>h</b>
                </Typography>
              </Box> */}
            </Box>
            <Box pt={2} display="flex" justifyContent="space-around">
              <span>
                <Button variant="outlined">Get a Quote</Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                >
                  Book Now
                </Button>
              </span>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={8}
          className={`${classes.sectionPadding} ${classes.marginTop}`}
        >
          <Box pb={2}>
            <Typography variant="body1">
              <b>Description</b>
            </Typography>
            <Typography variant="body2" className={classes.marginTop1}>
              {artist.description}
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box pt={2}>
            <Typography variant="body1">
              <b>Languages</b>
            </Typography>
            <Typography variant="body2" className={classes.marginTop1}>
              - English <br />- Urdu
            </Typography>
          </Box>
        </Paper>
        {/* </Box> */}
      </Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-around" pl={3}>
          {portfolio.length ? (
            <ReactPhotoCollage
              {...setting}
              photos={portfolio}
              layout={layout()}
            />
          ) : null}
        </Box>
        <Box pl={3} pt={3}>
          <Box display="flex">
            <Typography variant="h6" className={classes.flex}>
              <b>Reviews </b>
            </Typography>
            <Typography variant="body2" className={classes.flex}>
              <StarRateOutlined className={classes.icon} /> 4.5 (505 Orders)
            </Typography>
          </Box>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  artist: state.singleArtist
});

export default connect(mapStateToProps, { fetchSingleArtist })(ArtistPage);
