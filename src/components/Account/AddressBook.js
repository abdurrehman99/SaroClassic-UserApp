import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MuiPhoneNumber from "material-ui-phone-number";
import { CountryPicker } from "../CommonComponents";
import { connect } from "react-redux";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { updateProfile } from "../../redux/actions/userProfile";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function AddressBook({ user: { address = [] }, updateProfile }) {
  const classes = useStyles();
  const [currentComponent, setCurrentComponent] = useState("addressBook");
  const [fullName, setFullName] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("+92");

  const deleteAddress = (addressItem) => {
    updateProfile({
      address: address.filter((item) => item.address !== addressItem.address),
    });
  };
  const addAddress = (e) => {
    e.preventDefault();
    updateProfile({
      address: [
        ...address,
        {
          name: fullName,
          address: addressValue,
          country,
          contact,
        },
      ],
    });
    setFullName("");
    setAddressValue("");
    setCountry("");
    setContact("+92");
    setCurrentComponent("addressBook");
  };

  return currentComponent === "addressBook" ? (
    <Grid container>
      <Typography variant="h6">
        <b>Address Book</b>
      </Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {address.length ? (
              address.map((addressItem) => (
                <TableRow>
                  <TableCell>{addressItem.name}</TableCell>
                  <TableCell>{addressItem.address}</TableCell>
                  <TableCell>{addressItem.country}</TableCell>
                  <TableCell>{addressItem.contact}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteAddress(addressItem)}>
                      <DeleteOutlineOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="body1" className={classes.button}>
                No Address Added
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        // size="small"
        margin="dense"
        className={classes.button}
        onClick={() => setCurrentComponent("addNewAddress")}
      >
        Add New Address
      </Button>
    </Grid>
  ) : (
    <form onSubmit={addAddress}>
      <Grid container>
        <Typography variant="h6">
          <b>Add New Address </b>
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          label="Full Name"
          margin="dense"
          fullWidth
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          size="small"
          variant="outlined"
          label="Full Address"
          multiline
          margin="dense"
          fullWidth
          required
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
        />
        <Grid item xs={6} style={{ paddingRight: "10px" }}>
          <CountryPicker
            onChange={(e, v) => setCountry(v ? v.label : "")}
            value={{ label: country }}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiPhoneNumber
            defaultCountry={"pk"}
            size="small"
            variant="outlined"
            label="Phone"
            margin="dense"
            fullWidth
            required
            onChange={(v) => setContact(v)}
            value={contact}
          />
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          // size="small"
          margin="dense"
          required
          className={classes.button}
          style={{ marginRight: "10px" }}
          onClick={() => setCurrentComponent("addressBook")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          margin="dense"
          className={classes.button}
          type="submit"
        >
          Add Address
        </Button>
      </Grid>
    </form>
  );
}

const mapStateToProps = ({ currentUser: { user } }) => ({ user });

export default connect(mapStateToProps, { updateProfile })(AddressBook);
