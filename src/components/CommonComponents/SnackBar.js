import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import {
  showSnackBar as _showSnackBar,
  closeSnackBar,
} from "../../redux/actions";
import { store } from "../../";
import { connect } from "react-redux";

export function showSnackBar(message, type) {
  store.dispatch(_showSnackBar(message, type));
}

function SnackBar({ showSnackBar: { message, type, open }, closeSnackBar }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackBar();
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    showSnackBar: state.showSnackBar,
  };
};

export default connect(mapStateToProps, { closeSnackBar })(SnackBar);
