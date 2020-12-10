import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Collapse,
  List,
  ListItem,
  Typography,
  Box,
} from "@material-ui/core";
import { connect } from "react-redux";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@material-ui/icons";
import Inbox from "./Inbox";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory";
import ChangePassword from "./ChangePassword";
import AddressBook from "./AddressBook";
import ListAndSell from "./ListAndSell";
import MyReserveInvestment from "./MyReserveInvestment";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    fontFamily: "Montserrat",
  },
  gridItem: {
    padding: theme.spacing(1),
  },
  sideBar: {},
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f8f8f8",
      "& p": {
        fontWeight: "bold",
      },
    },
  },
  subListItem: {
    paddingLeft: theme.spacing(4),
  },
  currentSection: {
    backgroundColor: "#f8f8f8",
    "& p": {
      fontWeight: "bold",
      fontStyle: "italic",
    },
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function Account({ user, location: { state } }) {
  const classes = useStyles();
  const sectionList = [
    {
      item: "Manage Account",
      subItems: ["Profile"],
      // subItems: ["Profile", "Address Book", "Payment Methods"],
    },
    "Order History",
    "Privacy",
  ];
  const [currentSection, setCurrentSection] = useState(
    sectionList[0].subItems[0]
  );
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (state && state.section === "myReserveInvestments") {
      setCurrentSection(sectionList[3]);
    }
  }, [state]);

  return (
    <Grid container className={classes.mainContainer}>
      <Grid
        item
        md={3}
        xs={12}
        className={`${classes.sideBar} ${classes.gridItem}`}
      >
        <Box position="sticky" top={72}>
          <List>
            {sectionList.map((item) =>
              typeof item === "object" ? (
                <Fragment>
                  <ListItem
                    onClick={handleClick}
                    className={classes.listItem}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{item.item}</Typography>
                    {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subitem) => (
                        <ListItem
                          button
                          className={`${classes.listItem} ${
                            classes.subListItem
                          } ${
                            currentSection === subitem
                              ? classes.currentSection
                              : ""
                          }`}
                          onClick={() => setCurrentSection(subitem)}
                        >
                          <Typography variant="body2">{subitem}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Fragment>
              ) : (
                <ListItem
                  className={`${classes.listItem} ${
                    currentSection === item ? classes.currentSection : ""
                  }`}
                  onClick={() => setCurrentSection(item)}
                >
                  <Typography variant="body2">{item}</Typography>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Grid>
      <Grid item md={9} xs={12} className={classes.gridItem}>
        {currentSection === sectionList[0].subItems[0] && <Profile />}
        {currentSection === sectionList[0].subItems[1] && <AddressBook />}
        {currentSection === sectionList[0].subItems[2] && (
          <Fragment>
            <Typography variant="h6">
              <b>Payment Methods</b>
            </Typography>
          </Fragment>
        )}
        {currentSection === sectionList[1] && <OrderHistory />}
        {currentSection === sectionList[2] && <ChangePassword />}
        {currentSection === sectionList[3] && <MyReserveInvestment />}
        {currentSection === sectionList[4] && (
          <Fragment>
            <Typography variant="h6">
              <b>Documents</b>
            </Typography>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
  };
};

export default connect(mapStateToProps)(Account);

export { Inbox, ListAndSell };
