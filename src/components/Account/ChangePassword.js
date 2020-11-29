import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updatePassword } from "../../redux/actions";
import { fieldValidate } from "../../utils/formValidation";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function ChangePassword({ updatePassword, email, history }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({ oldPass: "", newPass: "" });
  const [formErrors, setFormErrors] = useState({ oldPass: {}, newPass: {} });

  const formValueChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: fieldValidate(value, "password") });
  };

  const changePassSubmit = (e) => {
    e.preventDefault();
    setFormValues({ oldPass: "", newPass: "" });
    updatePassword(
      {
        email,
        oldPassword: formValues.oldPass,
        newPassword: formValues.newPass,
      },
      history
    );
  };

  return (
    <form noValidate onSubmit={changePassSubmit}>
      <Typography variant="h6">
        <b>Change Password</b>
      </Typography>
      <TextField
        size="small"
        variant="outlined"
        label="Old Password"
        margin="dense"
        type="password"
        name="oldPass"
        required
        value={formValues.oldPass}
        onChange={formValueChange}
        error={formErrors.oldPass.error}
        helperText={formErrors.oldPass.helperText}
      />
      <br />
      <TextField
        size="small"
        variant="outlined"
        label="New Password"
        margin="dense"
        type="password"
        name="newPass"
        required
        value={formValues.newPass}
        onChange={formValueChange}
        error={formErrors.newPass.error}
        helperText={formErrors.newPass.helperText}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        disabled={
          formValues.oldPass === "" || formValues.newPass === "" ? true : false
        }
        margin="dense"
        type="submit"
        className={classes.button}
      >
        Update Password
      </Button>
    </form>
  );
}

const mapStateToProps = ({
  currentUser: {
    user: { email },
  },
}) => ({ email });

export default connect(mapStateToProps, { updatePassword })(ChangePassword);
