import React from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "../../utils/api/routes";
import CardImageGrid from "./CardImageGrid";
import StarRateOutlinedIcon from "@material-ui/icons/StarRateOutlined";
import { ImageDivBackground } from "../CommonComponents";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    width: "100%",
    margin: theme.spacing(1),
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outline: "rgba(255,174,0,0.5) 1px solid",
      boxShadow: theme.shadows[24],
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#ffae00",
  },
}));

function ArtistCard({ content, history: { push } }) {
  const classes = useStyles();
  const { portfolioImg, img, name, country, avgRating, _id } = content;

  return (
    <Card
      className={classes.card}
      raised
      onDragStart={(e) => e.preventDefault()}
      onClick={() => push(`/artists/${_id}`, content)}
    >
      <CardContent style={{ height: "250px" }}>
        <CardImageGrid images={portfolioImg} />
      </CardContent>

      <Divider light />
      <CardContent>
        <Grid container>
          <Grid xs={4}>
            <ImageDivBackground
              image={img}
              height="100px"
              width="100px"
              borderRadius="5px"
            />
          </Grid>
          <Grid
            xs={8}
            className={classes.flex}
            style={{ flexDirection: "column" }}
          >
            <Typography variant="body1">
              <b>{name}</b>
            </Typography>
            <Typography variant="caption">{country}</Typography>
            <Typography variant="body2" className={classes.flex}>
              <StarRateOutlinedIcon className={classes.icon} /> {avgRating} (505
              Orders)
            </Typography>
            <Typography variant="body1">Starting at $350</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    // <div></div>
  );
}

export default withRouter(ArtistCard);
