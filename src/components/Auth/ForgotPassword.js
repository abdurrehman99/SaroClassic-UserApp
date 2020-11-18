import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  TextField,
  LinearProgress,
  Hidden
} from "@material-ui/core";
import axios from "axios";
import { ROUTES } from "../../utils/api/routes";
import { showSnackBar } from "../CommonComponents";
import { fieldValidate } from "../../utils/formValidation";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  progressBar: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0
  }
}));

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    email: "",
    code: "",
    password: ""
  });
  const [formValidation, setFormValidation] = useState({
    email: {},
    code: {},
    password: {}
  });
  const [token, setToken] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const steps = ["Email Verification", "Code Verification", "Reset Password"];

  const formChange = ({ target: { name, value } }) => {
    let tempFormValues = JSON.parse(JSON.stringify(formValues));
    let tempFormValidation = JSON.parse(JSON.stringify(formValidation));
    tempFormValues[name] = value;
    tempFormValidation[name] = fieldValidate(value, name);
    setFormValues(tempFormValues);
    setFormValidation(tempFormValidation);
  };

  const isFormValid = () => {
    let valid = true;
    for (const val in formValidation) {
      if (formValidation[val].error) {
        valid = false;
      }
    }
    // Object.values(formValidation).map(val => {
    //   if (val.error) {
    //     valid = false;
    //   }
    //   return null;
    // });
    return valid;
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        //Email
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Email Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  size="small"
                  value={formValues.email}
                  onChange={formChange}
                  {...formValidation.email}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Input Code
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="code"
                  name="code"
                  label="Code"
                  fullWidth
                  autoFocus
                  size="small"
                  value={formValues.code}
                  onChange={formChange}
                  {...formValidation.code}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="secondary">
                  *Please check your email address for code.
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Enter New Password
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
                  autoFocus
                  fullWidth
                  size="small"
                  value={formValues.password}
                  onChange={formChange}
                  {...formValidation.password}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = async () => {
    setShowProgress(true);
    if (!isFormValid()) {
      showSnackBar("Resolve Errors", "error");
    } else {
      try {
        let response;
        switch (activeStep) {
          case 0:
            response = await axios.post(ROUTES.USER_FORGOT_SEND_CODE, {
              email: formValues.email
            });
            setToken(`Bearer ${response.data.result}`);
            break;
          case 1:
            response = await axios.post(
              ROUTES.USER_FORGOT_VERIFY_CODE,
              { code: formValues.code },
              {
                headers: {
                  Authorization: token
                }
              }
            );
            setToken(`Bearer ${response.data.result}`);
            break;
          case 2:
            response = await axios.post(
              ROUTES.USER_FORGOT_RESET_PASSWORD,
              { password: formValues.password },
              {
                headers: {
                  Authorization: token
                }
              }
            );
            showSnackBar("Password Reset Successful", "success");
            break;
          default:
            break;
        }
        setActiveStep(activeStep + 1);
      } catch (e) {
        showSnackBar(
          e.response ? e.response.data.responseMessage : "An Error Occurred",
          "error"
        );
      }
    }
    setShowProgress(false);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Forgot Password
          </Typography>
          <Hidden xsDown>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Hidden>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Log Back In
                </Typography>
                <Typography variant="subtitle1">
                  Password Reset Successfull
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Reset Password"
                      : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          {showProgress && (
            <LinearProgress color="primary" className={classes.progressBar} />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
}
