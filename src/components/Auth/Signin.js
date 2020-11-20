import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { logo } from "../../utils/contentConstants";
import { logoA } from "../../utils/contentConstants";
import sideImage from "../../assets/authImages/sideImage.jpg";
import { ROUTES } from "../../utils/api/routes";
import { setCurrentUser } from "../../redux/actions";
import { showSnackBar } from "../CommonComponents";
import { fieldValidate } from "../../utils/formValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  // backgroundImage: "url(https://source.unsplash.com/random)",
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

function Signin({ setCurrentUser, status, history: { goBack, action, push } }) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formValidation, setFormValidation] = useState({
    email: {},
    password: {},
  });

  useEffect(() => {
    if (status === "loggedIn") {
      action === "PUSH" ? goBack() : push("/");
    }
  }, [status]);

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
    return true;
  };

  const signinUser = async (e) => {
    e.preventDefault();
    if (
      !isFormValid() ||
      formValues.email === "" ||
      formValues.password === ""
    ) {
      showSnackBar("Please Enter Credentials in Correct Format !", "warning");
    } else {
      setLoading(true);
      try {
        const response = await axios.post(ROUTES.USER_LOGIN, formValues);
        let token = response.data.token.split(" ");
        localStorage.setItem("token", token[1]);
        setCurrentUser(response.data.user);
        setLoading(false);
        showSnackBar("User Logged Logged In !", "success");

        action === "PUSH" ? goBack() : push("/");
      } catch (e) {
        setLoading(false);
        showSnackBar(
          e.response ? e.response.data.message : "An Error Occurred",
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
          {/* <img src={logoA} width={80} alt="" /> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={signinUser}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formValues.email}
              onChange={formChange}
              size="small"
              {...formValidation.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
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

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" className={classes.linkStyle}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" className={classes.linkStyle}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ currentUser: { status } }) => ({ status });

export default connect(mapStateToProps, { setCurrentUser })(Signin);
