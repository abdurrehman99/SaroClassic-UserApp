import React, { Fragment, useState } from "react";
import axios from "axios";
import { Jumbotron, showSnackBar, FullpageLoader } from "../CommonComponents";
import { listAndSellPageContent } from "../../utils/contentConstants";
import {
  Container,
  Typography,
  TextField,
  Divider,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Box,
  Chip,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import MuiPhoneNumber from "material-ui-phone-number";
import { ROUTES } from "../../utils/api/routes";
import { withRouter } from "react-router-dom";
import { uploadImagesToCloudnary } from "../../utils/cloudinaryFunctions";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(3),
  },
  gridItem: {
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(2),
    },
  },
  grid: {
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[8],
    padding: theme.spacing(3),
  },
  btn: {
    margin: theme.spacing(1, 0),
  },
  thumbnail: {
    width: "80px",
    border: "5px solid white",
    borderRadius: "5px",
    boxShadow: theme.shadows[8],
    margin: "5px",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

function ListAndSell({ history: { push } }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [filenameList, setFilenameList] = useState("");
  const [files, setfiles] = useState([]);
  const [formValues, _setFormValues] = useState({});
  const [detailForm, setDetailForm] = useState({});
  const [detail, setDetail] = useState("");
  const [detailArray, setDetailArray] = useState([]);

  const handleChipDelete = (key) => {
    const arr = detailArray.filter((item) => item.key !== key);
    setDetailArray(arr);
    const stringarray = arr.map((item) => `${item.key}: ${item.value}`);
    setDetail(stringarray.join("\n"));
  };
  const setFormValues = (e, contact = false) => {
    const value = contact ? { name: "contact", value: e } : e.target;
    _setFormValues({ ...formValues, [value.name]: value.value });
  };

  const addDetail = () => {
    if (detailForm.key && detailForm.value) {
      setDetail(`${detail}${detailForm.key}: ${detailForm.value}\n`);
      setDetailArray([...detailArray, detailForm]);
      setDetailForm({ key: "", value: "" });
    }
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    if (
      !files.length ||
      !formValues.contact ||
      formValues.contact.toString().length < 4
    ) {
      showSnackBar("Fill All Required Fields", "error");
    } else {
      e.target.reset();
      // _setFormValues({ ...formValues, [value.name]: value.value });
      setLoading(true);
      try {
        // const formImgData = new FormData();
        // for (const i in Array.from(files)) {
        //   formImgData.append("file", files[i]);
        // }
        // const fileUpload = await axios.post(ROUTES.UPLOAD_IMG, formImgData);
        const fileUpload = await uploadImagesToCloudnary(files);
        // console.log(fileUpload);
        const {
          title,
          price,
          category,
          description,
          name,
          email,
          contact,
        } = formValues;
        const formData = {
          aboutArt: {
            title,
            price,
            category,
            description,
            detail: detailArray,
            img: fileUpload,
          },
          personalInformation: {
            name,
            email,
            contact,
          },
        };
        const response = await axios.post(
          ROUTES.LIST_SELL_SUBMIT_REQUEST,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showSnackBar(
          "Submitted Successfully, You Will Be Contacted Through Email",
          "success"
        );
        setFilenameList("");
        setfiles([]);
        setDetailForm({});
        setDetail("");
        setDetailArray([]);
      } catch (e) {
        // console.log(e);
        showSnackBar(
          e.response ? e.response.data.responseMessage : "An Error Occurred",
          "error"
        );
      }
    }
    setLoading(false);
  };

  const fileChange = ({ target: { files } }) => {
    setFilenameList(
      Array.from(files)
        .map((file) => file.name)
        .join(", ")
    );
    setfiles(Array.from(files));
  };

  return (
    <Fragment>
      <Jumbotron content={listAndSellPageContent.jumbotron} />
      <Container className={classes.mainContainer}>
        <Typography variant="h5">
          Want to sell on AfricanArt.International
        </Typography>
        <Typography variant="body2">
          Fill out the form with necessary details and we will get back to you.
        </Typography>
        <form onSubmit={submitRequest}>
          <Grid container className={classes.grid}>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Typography variant="body1">
                <b>About Art Piece</b>
              </Typography>
              <Divider className={classes.divider} />
              <TextField
                label="Title"
                name="title"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                onBlur={setFormValues}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                onBlur={setFormValues}
              />
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
              >
                <InputLabel id="categoryselect">Category</InputLabel>
                <Select
                  onBlur={setFormValues}
                  labelId="categoryselect"
                  label="Category"
                  // name="category"
                  defaultValue="general"
                >
                  <MenuItem value="general">General Art</MenuItem>
                  <MenuItem value="masterpiece">Masterpiece Art</MenuItem>
                  <MenuItem value="auction">Auction Art</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                name="description"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                multiline
                rows={4}
                onBlur={setFormValues}
              />
              {/* <Grid container alignItems="center" justify="flex-end">
                <Grid item xs={5} className={classes.gridItem}>
                  <TextField
                    label="Key"
                    name="detail"
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                    onBlur={setFormValues}
                  />
                </Grid>
                <Grid item xs={5} className={classes.gridItem}>
                  <TextField
                    label="Value"
                    name="detail"
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                    onBlur={setFormValues}
                  />
                </Grid>
                <Grid xs={1}>
                  <IconButton>
                    <AddOutlined />
                  </IconButton>
                </Grid>
              </Grid> */}
              <TextField
                label="Detail"
                name="detail"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                multiline
                rows={4}
                value={detail}
                disabled
              />
              {detailArray.map((item) => (
                <Chip
                  label={item.key}
                  onDelete={() => handleChipDelete(item.key)}
                  style={{ margin: "5px" }}
                />
              ))}
              <Box display="flex">
                <TextField
                  label="Key"
                  name="detail"
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  value={detailForm.key}
                  onChange={({ target: { value } }) =>
                    setDetailForm({ ...detailForm, key: value })
                  }
                  style={{ marginRight: 10 }}
                />
                <TextField
                  label="Value"
                  name="detail"
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  value={detailForm.value}
                  onChange={({ target: { value } }) =>
                    setDetailForm({ ...detailForm, value })
                  }
                />
                <IconButton onClick={addDetail}>
                  <AddOutlined />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <b>Attach Images</b>
              </Typography>
              <Divider className={classes.divider} />
              <TextField
                label="Selected Images"
                variant="outlined"
                required
                disabled
                value={filenameList}
                size="small"
                margin="dense"
                fullWidth
              />
              {files.length
                ? files.map((file) => (
                    <img
                      alt="Uploaded Images"
                      src={URL.createObjectURL(file)}
                      className={classes.thumbnail}
                    />
                  ))
                : null}
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
                className={`MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-fullWidth makeStyles-button-187 MuiButton-outlinedPrimary ${classes.btn}`}
              >
                Attach Images
              </label>
              <Typography variant="body1">
                <b>Personal Information</b>
              </Typography>
              <Divider className={classes.divider} />
              <TextField
                label="Name"
                name="name"
                type="name"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                onBlur={setFormValues}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                onBlur={setFormValues}
              />
              <MuiPhoneNumber
                defaultCountry={"pk"}
                label="Phone"
                name="contact"
                fullWidth
                variant="outlined"
                size="small"
                margin="dense"
                required
                onBlur={setFormValues}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.btn}
                type="submit"
                // onClick={submitRequest}
              >
                Submit Request*
              </Button>
              <Typography variant="body2">
                *A non-refundable $10 processing fee, will be charged on request
                submission and if listed, a further one time non-refundable
                listing fee of $40 will be charged.
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
      {loading ? <FullpageLoader /> : null}
    </Fragment>
  );
}

export default withRouter(ListAndSell);
