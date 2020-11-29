import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import { fieldValidate } from "../../utils/formValidation";
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
  const [contact, setContact] = useState("");
  const [shippingAddress, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [contactError, setContactError] = useState({
    error: false,
    helperText: "",
  });

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setContact(user.contact || "");
      setAddress(user.shippingAddress || "");
    }
  }, [user]);

  const contactChange = (value) => {
    setContact(value);
    setDisabled(false);
  };

  const onSubmit = () => {
    let result = fieldValidate(contact, "contact");
    setContactError(result);
    if (result.error === false) {
      updateProfile({
        email: user.email,
        name: fullName,
        contact,
        shippingAddress,
      });
      setDisabled(true);
    }
  };
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
            inputProps={{
              maxLength: 25,
            }}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setDisabled(true);
            }}
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
            inputProps={{
              maxLength: 40,
            }}
            value={shippingAddress}
            onChange={(e) => {
              setAddress(e.target.value);
              setDisabled(false);
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Contact No."
            type="text"
            margin="dense"
            fullWidth
            error={contactError.error}
            helperText={contactError.helperText}
            inputProps={{
              maxLength: 10,
            }}
            onChange={(e) => contactChange(e.target.value)}
            value={contact}
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
        disabled={disabled}
        onClick={() => onSubmit()}
      >
        Update Information
      </Button>
    </Fragment>
  );
}

const mapStateToProps = ({ currentUser: { user } }) => ({ user });

export default connect(mapStateToProps, { updateProfile })(Profile);
