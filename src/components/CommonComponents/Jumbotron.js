import React from "react";
import { Typography, Container, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "70vh",
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
  },
}));

export default function Jumbotron({ content, height }) {
  const classes = useStyles();
  const { title, description, imageURL } = content;

  return (
    <Box
      className={classes.mainDiv}
      style={{
        backgroundImage: `url(${imageURL})`,
        ...(height ? { height } : null),
      }}
      boxShadow={3}
    >
      <div className={classes.innerDiv}>
        <Container>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5">{description}</Typography>
        </Container>
      </div>
    </Box>
  );
}
