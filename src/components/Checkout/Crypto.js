import React from "react";
import QRCode from "qrcode.react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ImageDivBackground } from "../CommonComponents";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: 3,
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 3),
    // },
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  paymentContainer: {
    border: "5px solid #f7f7f7",
    textAlign: "center",
    padding: theme.spacing(3, 0),
  },
  buttonStyle: {
    width: "200px",
    margin: "5px",
  },
}));

export default function Crypto({ history }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={4} className={classes.paymentContainer}>
        <Typography variant="h5">Pay with Crypto</Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode
            value="0xf15D7C88B45F62ba93712F5E79D074a804D6E2Be"
            size={200}
            includeMargin
          />
          <Button
            variant="contained"
            className={classes.buttonStyle}
            onClick={() => history.push("/checkout")}
          >
            Cancel
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export const CryptoButton = () => {
  const history = useHistory();
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ width: "200px", margin: "5px" }}
      onClick={() => history.push("/paywithcrypto")}
    >
      <ImageDivBackground
        image={require("../../assets/icons/coin.png")}
        width="20px"
        height="20px"
        borderRadius="5px"
        style={{ marginRight: "10px" }}
      />
      Pay with Crypto
    </Button>
  );
};
