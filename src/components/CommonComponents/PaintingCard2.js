import React from "react";
import { Typography, Card, Box } from "@material-ui/core";
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
    // margin: "16px auto",
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

export default function PaintingCard2({ onClick, content, marginAuto }) {
  const classes = useStyles();
  const { name, price, images, category } = content;

  return (
    <Card
      className={classes.card}
      raised
      onClick={onClick}
      style={marginAuto ? { margin: "16px auto" } : {}}
    >
      <ImageDivBackground
        image={images[0]}
        // backgroundSize="contain"
        height="200px"
      />
      <Box py={2} px={4}>
        <Typography variant="body1">
          <b>
            {name.length > 22
              ? name.split("").splice(0, 22).join("") + "..."
              : name}
          </b>
        </Typography>
        <Typography variant="body1">Rs{price}</Typography>
      </Box>
      <Box className={classes.categoryOverlay}>
        <Typography variant="caption">
          <b>{category ? category.toUpperCase() : null}</b>
        </Typography>
      </Box>
    </Card>
  );
}
