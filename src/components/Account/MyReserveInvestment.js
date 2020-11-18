import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CModal,
  ImageDivBackground,
  NumberOfSharesDialog,
  showSnackBar,
} from "../CommonComponents";
import { ROUTES } from "../../utils/api/routes";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    "& th": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));

function MyReserveInvestment({ reserves }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [maxUnits, setMaxUnits] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSelectedShare, setCurrentSelectedShare] = useState(null);

  const toggleDialogOpen = (id) => {
    setCurrentSelectedShare(id);
    setDialogOpen(true);
  };

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const showDetails = (item) => {
    setModalContent(item);
    setModalOpen(true);
  };

  const tradeShares = async (units, perUnitValue, reason) => {
    setDialogOpen(false);
    if (reason === "ok") {
      try {
        const response = await axios.post(
          `${ROUTES.ART_TRADE_SELL_SHARE}/${currentSelectedShare}`,
          {
            units: parseInt(units),
            perUnitValue: parseFloat(perUnitValue),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response);
      } catch (e) {
        showSnackBar(
          e.response ? e.response.data.responseMessage : "An Error Occurred",
          "error"
        );
      }
    }
  };

  return reserves ? (
    <Fragment>
      {/* {console.log(reserves)} */}
      <Typography variant="h6">
        <b>Reserve Investments</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Art</TableCell>
              <TableCell>Unit</TableCell>
              {/* <TableCell>Ownership Percentage</TableCell> */}
              <TableCell>Equity/Buying Price</TableCell>
              <TableCell>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reserves.map(({ units, equity, item, _id }) => {
              const row = [units, equity];
              const { img, title, artistName } = item;
              return (
                <Fragment>
                  <TableRow key={row.name}>
                    <TableCell>
                      <Box display="flex">
                        <ImageDivBackground
                          width="60px"
                          height="60px"
                          borderRadius="5px"
                          image={img[0]}
                        />
                        <Box
                          ml={1}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Typography variant="body2">
                            <b>{title}</b>
                            <br /> by {artistName}
                          </Typography>
                          <Typography
                            variant="caption"
                            style={{ cursor: "pointer" }}
                            onClick={() => showDetails(item)}
                          >
                            Show Details
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    {row.map((tbcell) => (
                      <TableCell>{tbcell}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          setMaxUnits(units);
                          toggleDialogOpen(_id);
                        }}
                      >
                        Trade Now
                      </Button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CModal open={modalOpen} close={toggleModalOpen} content={modalContent} />
      <NumberOfSharesDialog
        open={dialogOpen}
        closeFunction={tradeShares}
        content={{
          title: "Trade Shares",
          description: "Enter number of units to list for trading.",
          btnTitle: "Sell",
        }}
        maxUnits={maxUnits}
      />
    </Fragment>
  ) : null;
}

const mapStateToProps = ({
  currentUser: {
    user: { Reserves },
  },
}) => {
  return {
    reserves: Reserves,
  };
};

export default connect(mapStateToProps)(MyReserveInvestment);
