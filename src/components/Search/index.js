import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { search } from "../../redux/actions/search";
import { Container, Typography, Card, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ImageDivBackground } from "../CommonComponents";
import { ROUTES } from "../../utils/api/routes";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(3),
  },
  card: {
    width: "300px",
    margin: theme.spacing(2),
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outline: "rgba(255,174,0,0.5) 1px solid",
      boxShadow: theme.shadows[24],
    },
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
  },
  categoryOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    transformOrigin: "left",
    transform: "rotate(90deg) translateY(-50%)",
    backgroundColor: "rgba(28,28,28,0.7)",
    color: "white",
    padding: "5px 10px",
  },
}));

function Search({
  location: { search: searchQuery },
  history: { push },
  search,
  searchResult,
}) {
  const classes = useStyles();

  const searchItemClick = (productId, category) => {
    if (category === "general") {
      category = "buyart";
    }
    push(`/${category}/${productId}`);
  };

  useEffect(() => {
    search(new URLSearchParams(searchQuery).get("term"));
  }, []);

  return (
    <Container className={classes.marginTop}>
      <Typography variant="h4">Search Result</Typography>

      {searchResult.length ? (
        <Fragment>
          <Typography variant="h6" className={classes.title}>
            Total {searchResult.length} results found.
          </Typography>
          <Grid container>
            {searchResult.map(({ _id, img, title, category, price }) => (
              <Grid
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
                className={classes.gridItemStyle}
              >
                <Card
                  className={classes.card}
                  raised
                  onClick={(_) => searchItemClick(_id, category)}
                >
                  <ImageDivBackground
                    image={img[0]}
                    // backgroundSize="contain"
                    height="200px"
                  />
                  <Box py={2} px={4}>
                    <Typography variant="body1">
                      <b>
                        {(title.length > 22
                          ? title.split("").splice(0, 22).join("") + "..."
                          : title
                        ).toUpperCase()}
                      </b>
                    </Typography>
                    <Typography variant="body1">${price}</Typography>
                  </Box>
                  <Box className={classes.categoryOverlay}>
                    <Typography variant="caption">
                      <b>{category ? category.toUpperCase() : "N/A"}</b>
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      ) : (
        <Typography variant="h6" className={classes.title}>
          Nothing Found :(
        </Typography>
      )}
    </Container>
  );
}

const mapStateToProps = ({ searchResult }) => ({
  searchResult,
});

export default connect(mapStateToProps, { search })(Search);
