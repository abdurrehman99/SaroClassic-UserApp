import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Collapse,
} from "@material-ui/core";
import { Jumbotron } from "../CommonComponents";
import { buyArtContent } from "../../utils/contentConstants";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "../CommonComponents/Filter";
import BuyArtProducts from "./BuyArtProducts";
import { getMenProducts } from "../../redux/actions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Delete from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  title: {
    padding: theme.spacing(2, 0, 1, 2),
    fontStyle: "italic",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "white",
  },
  arrowSpan: {
    display: "flex",
    alignItems: "center",
  },
}));

function BuyArt({ masterpiece, getMenProducts, allCategories }) {
  const classes = useStyles();
  const [priceOpen, setPriceOpen] = useState(true);
  const [category, setCategory] = useState("");
  const [AllCategory, setAllCategory] = useState([]);

  useEffect(() => {
    getMenProducts("MEN");
  }, []);

  useEffect(() => {
    let filtered = allCategories.filter((e) => e.mainCategory === "MEN");
    setAllCategory(filtered);
    // console.log("filtered", filtered);
  }, [allCategories]);

  const setFilter = (name, index) => {
    setCategory(name);
    let All = AllCategory;

    setAllCategory(All);
  };

  return (
    <>
      {/* <Jumbotron
        content={
          masterpiece
            ? buyArtContent.masterpiece.jumbotron
            : buyArtContent.general.jumbotron
        }
      /> */}
      <Grid container>
        <Grid item md={3} xs={12} className={classes.marginTop}>
          <Box position="sticky" top={72}>
            <Typography variant="body1" className={classes.title}>
              Filter Options
            </Typography>
            <List
              component="div"
              disablePadding
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  className={classes.flex}
                  onClick={() => setPriceOpen(!priceOpen)}
                >
                  Categories
                  <span className={classes.arrowSpan}>
                    {priceOpen ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </ListSubheader>
              }
            >
              <Collapse in={priceOpen} timeout="auto" unmountOnExit>
                {AllCategory.map((p, i) => {
                  return (
                    <ListItem
                      key={i}
                      button
                      onClick={() => setFilter(p.name, i)}
                      className={classes.nested}
                    >
                      <ListItemText
                        primary={p.name}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                      <ListItemSecondaryAction>
                        {/* <Checkbox
                          edge="end"
                          onChange={() => setFilter(p.name, i)}
                          checked={AllCategory[i].checked}
                          size="small"
                        /> */}
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
                {category ? (
                  <ListItem
                    button
                    onClick={() => setFilter("CLEAR")}
                    className={classes.nested}
                  >
                    <ListItemText
                      primary={"Clear Filters"}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                    <Delete />
                  </ListItem>
                ) : null}
              </Collapse>
            </List>
          </Box>
        </Grid>
        <Grid item md={9} xs={12}>
          <BuyArtProducts
            category={category}
            masterpiece={masterpiece ? true : false}
          />
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.categories,
    filter: state.artListing.filter,
  };
};

export default connect(mapStateToProps, { getMenProducts })(BuyArt);
