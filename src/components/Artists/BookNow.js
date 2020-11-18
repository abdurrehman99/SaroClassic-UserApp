import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Hidden,
  Stepper,
  Step,
  StepLabel,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@material-ui/core";
import { Jumbotron, showSnackBar } from "../CommonComponents";
import { servicesPageContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { ROUTES } from "../../utils/api/routes";
import { connect } from "react-redux";
import { uploadImagesToCloudnary } from "../../utils/cloudinaryFunctions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  thumbnail: {
    width: "80px",
    border: "5px solid white",
    borderRadius: "5px",
    boxShadow: theme.shadows[8],
    margin: "5px",
  },
  progressBar: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
}));

function BookNow({ status, user }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [files, setfiles] = useState([]);
  const [filenameList, setFilenameList] = useState("");
  const formDefault = {
    category: "Portraits",
    description: "",
  };
  const [formValues, setFormValues] = useState(formDefault);
  const steps = ["Order Type", "Order Details", "Book Now"];

  const formChange = ({ target: { value, name } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const fileChange = ({ target: { files } }) => {
    setFilenameList(
      Array.from(files)
        .map((file) => file.name)
        .join(", ")
    );
    setfiles(Array.from(files));
  };

  const bookNowRequest = async () => {
    setShowProgress(true);
    try {
      // const formImgData = new FormData();
      // for (const i in Array.from(files)) {
      //   formImgData.append("file", files[i]);
      // }
      // const fileUpload = await axios.post(ROUTES.UPLOAD_IMG, formImgData);
      const fileUpload = await uploadImagesToCloudnary(files);
      // console.log(fileUpload);
      const formData = {
        user: user.id,
        aboutArt: {
          ...formValues,
          img: fileUpload,
        },
      };
      const res = await axios.post(ROUTES.ORDER_PORTRAIT, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showSnackBar(
        "Submitted Successfully, You Will Be Contacted Through Email",
        "success"
      );
      setActiveStep(activeStep + 1);
      setFilenameList("");
      setfiles([]);
      setFormValues(formDefault);
    } catch (e) {
      // console.log(e);
      showSnackBar(
        e.response ? e.response.data.responseMessage : "An Error Occurred",
        "error"
      );
    }
    setShowProgress(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Art Type
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="category"
                  onChange={formChange}
                  value={formValues.category}
                  required
                >
                  <MenuItem value="Portraits">Portraits</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  onChange={formChange}
                  value={formValues.description}
                  multiline
                  fullWidth
                  helperText="Briefly describe the art piece you want us to make, attach images to describe better."
                />
                <Box display="flex" alignItems="flex-end">
                  <TextField
                    label="Selected Images"
                    disabled
                    value={filenameList}
                    multiline
                    style={{ flex: 1 }}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    accept="image/*"
                    id="attachment"
                    onChange={fileChange}
                  />
                  <label
                    htmlFor="attachment"
                    className="MuiButtonBase-root MuiButton-root MuiButton-outlined makeStyles-button-187 MuiButton-outlinedPrimary"
                  >
                    Attach Images
                  </label>
                </Box>
                {files.length ? (
                  <Box mt={1}>
                    {files.map((file) => (
                      <img
                        alt="Uploaded Images"
                        src={URL.createObjectURL(file)}
                        className={classes.thumbnail}
                      />
                    ))}
                  </Box>
                ) : null}
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Get your imagination to reality.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
            </Grid>
          </React.Fragment>
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleStep = async (n) => {
    if (activeStep + n === steps.length) {
      bookNowRequest();
    } else {
      if (
        activeStep === 1 &&
        (formValues.description === "" || filenameList === "")
      ) {
        showSnackBar("Fill All Form Values", "error");
      } else {
        setActiveStep(activeStep + n);
      }
    }
  };

  return (
    <Fragment>
      <Jumbotron content={servicesPageContent.jumbotron} />
      {/* <Grid container></Grid> */}
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Book Portrait Service
            </Typography>
            <Hidden xsDown>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Hidden>
            <React.Fragment>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography variant="h5" gutterBottom>
                    Order Received.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    You will be contacted through Email.
                  </Typography>
                </Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep >= 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStep(-1)}
                        className={classes.button}
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStep(1)}
                      className={classes.button}
                      disabled={status !== "loggedIn"}
                    >
                      {activeStep === steps.length - 1
                        ? "Get a quote and Book"
                        : "Next"}
                    </Button>
                  </div>
                  {status !== "loggedIn" ? (
                    <Typography variant="body2" className={classes.error}>
                      *Sign in to continue
                    </Typography>
                  ) : null}
                </React.Fragment>
              )}
            </React.Fragment>
            {showProgress && (
              <LinearProgress color="primary" className={classes.progressBar} />
            )}
          </Paper>
        </main>
      </React.Fragment>
    </Fragment>
  );
}

const mapStateToProps = ({ currentUser: { status, user } }) => ({
  status,
  user,
});

export default connect(mapStateToProps)(BookNow);
