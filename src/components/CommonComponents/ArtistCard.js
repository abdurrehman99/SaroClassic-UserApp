import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "250px",
    textAlign: "center",
    margin: theme.spacing(1)
  },
  cardMedia: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function ArtistCard({
  content: { displayName, img, country, completedOrders }
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card} raised onDragStart={e => e.preventDefault()}>
      <CardContent className={classes.cardMedia}>
        <Avatar
          src={img}
          style={{ width: "60%", height: "130px" }}
        />
      </CardContent>
      <Divider light />
      <CardContent>
        <Typography variant="body1">
          <b>{displayName}</b>
        </Typography>
        <Typography variant="body2" color="secondary">
          <b>Country:</b> {country}
        </Typography>
        <Typography variant="body2" color="secondary">
          <b>Completed Orders:</b> {completedOrders}
        </Typography>
      </CardContent>
    </Card>
  );
}
