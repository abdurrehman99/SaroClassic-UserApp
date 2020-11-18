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

function ChangePassword({ updatePassword, email }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({ oldPass: "", newPass: "" });
  const [formErrors, setFormErrors] = useState({ oldPass: {}, newPass: {} });

  const formValueChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: fieldValidate(value, "password") });
  };

  const changePassSubmit = (e) => {
    e.preventDefault();
    updatePassword({
      email,
      password: formValues.oldPass,
      newPassword: formValues.newPass,
    });
  };

  return (
    <form onSubmit={changePassSubmit}>
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
        fullWidth
        value={formValues.oldPass}
        onChange={formValueChange}
        error={formErrors.oldPass.error}
        helperText={formErrors.oldPass.helperText}
      />
      <TextField
        size="small"
        variant="outlined"
        label="New Password"
        margin="dense"
        type="password"
        name="newPass"
        required
        fullWidth
        value={formValues.newPass}
        onChange={formValueChange}
        error={formErrors.newPass.error}
        helperText={formErrors.newPass.helperText}
      />
      <Button
        variant="contained"
        color="primary"
        // size="small"
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
