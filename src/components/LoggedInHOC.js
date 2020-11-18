import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

function LoggedInHOC({ status }) {
  const history = useHistory();
  return (Component) => {
    if (status === "loggedIn") {
      return Component;
    } else {
      history.push("/signin");
    }
  };
}

const mapStateToProps = ({ currentUser: { status } }) => ({ status });

export default connect(mapStateToProps)(LoggedInHOC);
