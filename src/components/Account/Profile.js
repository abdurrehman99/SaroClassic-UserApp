import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import { CountryPicker } from "../CommonComponents";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { updateProfile } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function Profile({ user, updateProfile }) {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("+92");
  const [shippingAddress, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setCountry(user.country || "");
      setContact(user.contact || "");
      setAddress(user.shippingAddress || "");
    }
  }, [user]);
  return (
    <Fragment>
      <Typography variant="h6">
        <b>General Information</b>
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Full Name"
            margin="dense"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Email"
            margin="dense"
            fullWidth
            defaultValue={user.email}
            disabled
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Shipping Address"
            margin="dense"
            fullWidth
            value={shippingAddress}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Contact No."
            margin="dense"
            fullWidth
            value={contact}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+92</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        margin="dense"
        className={classes.button}
        onClick={() =>
          updateProfile({
            name: fullName,
            country,
            contact,
          })
        }
      >
        Update Information
      </Button>
    </Fragment>
  );
}

const mapStateToProps = ({ currentUser: { user } }) => ({ user });

export default connect(mapStateToProps, { updateProfile })(Profile);
