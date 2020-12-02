import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Jumbotron } from "../CommonComponents";
import { buyArtContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "../CommonComponents/Filter";
import BuyArtProducts from "./BuyArtProducts";
import { getAllProducts } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
}));

function BuyArt({ filter, masterpiece, getAllProducts }) {
  const classes = useStyles();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Jumbotron
        content={
          masterpiece
            ? buyArtContent.masterpiece.jumbotron
            : buyArtContent.general.jumbotron
        }
      />
      <Grid container>
        <Grid item md={3} xs={12} className={classes.marginTop}>
          <Filter
            filter={filter}
            page={masterpiece ? "masterpiece" : "general"}
          />
        </Grid>
        <Grid item md={9} xs={12}>
          <BuyArtProducts masterpiece={masterpiece ? true : false} />
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    filter: state.artListing.filter,
  };
};

export default connect(mapStateToProps, { getAllProducts })(BuyArt);
