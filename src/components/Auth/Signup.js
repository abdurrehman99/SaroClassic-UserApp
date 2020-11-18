import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/api/routes";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { showSnackBar } from "../CommonComponents";
import sideImage from "../../assets/authImages/sideImage.jpg";
import { fieldValidate } from "../../utils/formValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${sideImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  linkStyle: {
    textDecoration: "none",
    color: "black",
    fontFamily: "Montserrat",
    fontSize: theme.typography.body2.fontSize,
  },
}));

export default function Signup({ history: { push } }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formValidation, setFormValidation] = useState({
    name: {},
    email: {},
    password: {},
  });

  const formChange = ({ target: { name, value } }) => {
    let tempFormValues = JSON.parse(JSON.stringify(formValues));
    let tempFormValidation = JSON.parse(JSON.stringify(formValidation));
    tempFormValues[name] = value;
    tempFormValidation[name] = fieldValidate(value, name);
    setFormValues(tempFormValues);
    setFormValidation(tempFormValidation);
  };

  const isFormValid = () => {
    for (const val in formValidation) {
      if (formValidation[val].error) {
        return false;
      }
    }
    // Object.values(formValidation).map(val => {
    //   if (val.error) {
    //     return false;
    //   }
    // });
    return true;
  };

  const signupUser = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      showSnackBar("Resolve Errors", "error");
    } else {
      try {
        const response = await axios.post(ROUTES.USER_REGISTER, formValues);
        showSnackBar(response.data.responseMessage, "success");
        push("/signin");
      } catch (e) {
        showSnackBar(
          e.response ? e.response.data.responseMessage : "An Error Occurred",
          "error"
        );
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={signupUser}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formValues.name}
                  onChange={formChange}
                  {...formValidation.name}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={formChange}
                  size="small"
                  {...formValidation.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formValues.password}
                  onChange={formChange}
                  size="small"
                  {...formValidation.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      size="small"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.linkStyle} to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
