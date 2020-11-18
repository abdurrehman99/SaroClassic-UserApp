import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  search: {
    padding: "0 16px",
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end"
    }
  },
  textField: {
    marginLeft: "2px",
    flex: 1
  }
}));

function SearchInput({
  artListingAll,
  openModal,
  type = "buyartAll",
  history
}) {
  const classes = useStyles();

  return (
    <Grid item sm={4} xs={12} className={classes.search}>
      <SearchIcon />
      <Autocomplete
        freeSolo
        disableClearable
        clearOnEscape
        options={artListingAll}
        getOptionLabel={ele => ele.title}
        className={classes.textField}
        onChange={(e, data) => {
          e.target.value = "";
          if (type === "buyartAll") {
            openModal(data);
          }
        }}
        renderInput={params => {
          return (
            <TextField
              {...params}
              fullWidth
              placeholder="Search"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          );
        }}
      />
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    artListingAll: state.artListing.all
  };
};

export default connect(mapStateToProps)(withRouter(SearchInput));
