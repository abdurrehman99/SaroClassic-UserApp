import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Jumbotron } from "../CommonComponents";
import { makeStyles } from "@material-ui/core/styles";
import { reserveContent } from "../../utils/contentConstants";
import ReserveCard from "./ReserveCard";
import ReserveProductPage from "./ReserveProductPage";
import { fetchArtListingReserves } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  pageContainer: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3)
    }
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Reserve({ history, fetchArtListingReserves, reserves }) {
  const classes = useStyles();
  useEffect(() => {
    fetchArtListingReserves();
  }, []);

  return (
    <Fragment>
      <Jumbotron content={reserveContent.jumbotron} />
      <Grid container className={classes.pageContainer}>
        {reserves.map(reserveItem => (
          <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className={classes.gridItemStyle}
          >
            <ReserveCard content={reserveItem} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = ({ artListing: { reserves } }) => ({
  reserves
});

export default connect(mapStateToProps, { fetchArtListingReserves })(Reserve);
export { ReserveProductPage };
