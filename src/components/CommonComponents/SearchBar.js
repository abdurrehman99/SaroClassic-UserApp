import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { search } from "../../redux/actions";
import { ROUTES } from "../../utils/api/routes";
import { ImageDivBackground } from ".";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: theme.spacing(0, 2),
    // maxHeight: theme.spacing(5)
    maxHeight: "38.641px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  searchResult: {
    // position: "absolute",
    overflowY: "auto",
    marginTop: theme.spacing(1),
    maxHeight: "50vh",
    width: "100%",
  },
  searchItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ececec",
    },
  },
  thumbnail: {
    border: "5px solid white",
    borderRadius: "5px",
    boxShadow: theme.shadows[3],
    marginRight: "5px",
  },
  text: {
    padding: theme.spacing(2),
  },
}));

function SearchBar({ search, searchResult, history: { push } }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const searchChange = ({ target: { value } }) => {
    search(value);
    setSearchTerm(value);
  };
  // const handleSearchBarBlur = event => {
  //   // if the blur was because of outside focus
  //   // currentTarget is the parent element, relatedTarget is the clicked element
  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     setDisplaySearchResult(false);
  //   }
  // };
  const searchItemClick = (productId, category) => {
    // push("/buyart");
    if (category === "general") {
      category = "buyart";
    }
    push(`/${category}/${productId}`);
    setDisplaySearchResult(false);
  };

  return (
    <div className={classes.searchBar}>
      <TextField
        placeholder="Search Art, Masterpieces, Auction & more"
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={searchChange}
        onBlur={() => setDisplaySearchResult(false)}
        // onBlur={handleSearchBarBlur}
        onFocus={() => setDisplaySearchResult(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
      <Paper
        className={classes.searchResult}
        elevation={3}
        style={{ display: displaySearchResult ? "block" : "none" }}
      >
        <List>
          {searchResult.length ? (
            <Fragment>
              <ListItem
                className={classes.searchItem}
                onMouseDown={() => push(`/search?term=${searchTerm}`)}
              >
                <ListItemText primary="See Full Result.." />
              </ListItem>
              <Divider />
              {searchResult.slice(0, 3).map(({ _id, img, title, category }) => (
                <ListItem
                  className={classes.searchItem}
                  onMouseDown={() => searchItemClick(_id, category)}
                >
                  <ListItemIcon>
                    <ImageDivBackground
                      image={img[0]}
                      width="40px"
                      height="40px"
                      className={classes.thumbnail}
                    />
                  </ListItemIcon>
                  <ListItemText primary={title} secondary={category || "N/A"} />
                </ListItem>
              ))}
            </Fragment>
          ) : (
            <Typography variant="body1" className={classes.text}>
              Nothing To Show
            </Typography>
          )}
        </List>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.searchResult,
  };
};

export default connect(mapStateToProps, { search })(withRouter(SearchBar));
