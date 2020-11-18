import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Checkbox,
  Divider,
  Box,
  Typography
} from "@material-ui/core";
import {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchArtListingAuction
} from "../../redux/actions";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    padding: theme.spacing(2, 0, 1, 2),
    fontStyle: "italic"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "white"
  },
  arrowSpan: {
    display: "flex",
    alignItems: "center"
  }
}));

function Filter({
  filter,
  page,
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchArtListingAuction,
  pageNo
}) {
  const classes = useStyles();
  const [open, setOpen] = useState({});
  const [checked, setChecked] = useState({});
  const handleClick = fieldName => {
    let newState = JSON.parse(JSON.stringify(open));
    newState[fieldName] = !open[fieldName];
    setOpen(newState);
  };

  // const handleToggle = value => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  const handleToggle = (key, item) => () => {
    // setChecked({...checked, });
    let newState = JSON.parse(JSON.stringify(checked));
    if (newState[key]) {
      if (typeof item === "object") {
        let oldLength = newState[key].length;
        newState[key] = newState[key].filter(e => e._id !== item._id);
        oldLength === newState[key].length && newState[key].push(item);
      } else {
        newState[key].includes(item)
          ? (newState[key] = newState[key].filter(_item => _item !== item))
          : newState[key].push(item);
      }
    } else {
      newState[key] = [item];
    }

    switch (page) {
      case "general":
        fetchArtListingGeneral(1, newState);
        break;
      case "masterpiece":
        fetchArtListingMasterpiece(1, newState);
        break;
      case "auction":
        fetchArtListingAuction(1, newState);
        break;
      default:
        break;
    }
    setChecked(newState);
  };
  // useEffect(() => {
  //   if (filter.length === undefined) {
  //     switch (page) {
  //       case "general":
  //         fetchArtListingGeneral(1, checked);
  //         break;
  //       case "masterpiece":
  //         fetchArtListingMasterpiece(1, checked);
  //         break;
  //       case "auction":
  //         fetchArtListingAuction(1, checked);
  //         break;
  //     }
  //   }
  // }, [checked]); //here

  useEffect(() => {
    let newState = {};
    Object.keys(filter).map(key => (newState[key.replace(/\s+/g, "")] = []));
    setChecked(newState);
  }, [filter]);

  return (
    <Box position="sticky" top={72}>
      <Typography variant="body1" className={classes.title}>
        Filter Options
      </Typography>
      {Object.keys(filter).map(_key => {
        let key = _key.replace(/\s+/g, "");
        return (
          <Fragment>
            <List
              component="div"
              disablePadding
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  className={classes.flex}
                  onClick={() => handleClick(key)}
                >
                  {key}
                  <span className={classes.arrowSpan}>
                    {open[key] ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </ListSubheader>
              }
            >
              <Collapse in={open[key]} timeout="auto" unmountOnExit>
                {filter[_key].map(item => (
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      primary={
                        typeof item === "object" ? item.displayName : item
                      }
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(key, item)}
                        checked={checked[key] && checked[key][item]}
                        size="small"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {/* <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Vincent Van"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem> */}
              </Collapse>
            </List>
            <Divider />
          </Fragment>
        );
      })}
    </Box>
  );
}

export default connect(_ => ({}), {
  fetchArtListingGeneral,
  fetchArtListingMasterpiece,
  fetchArtListingAuction
})(Filter);
