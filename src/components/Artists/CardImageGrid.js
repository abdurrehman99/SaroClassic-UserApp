import React from "react";
import { Grid } from "@material-ui/core";
import { ROUTES } from "../../utils/api/routes";

const imgDiv = (image, height, props) => (
  <div
    style={{
      height: height,
      backgroundImage: `url(${image})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      ...props
    }}
  ></div>
);

export default function CardImageGrid({ images }) {
  return (
    <Grid container style={{ width: "100%", height: "100%" }}>
      <Grid item xs={6}>
        {imgDiv(images[0], "100%", { borderRadius: "5px 0 0 5px" })}
      </Grid>

      <Grid item xs={6} style={{ borderLeft: " 5px solid white" }}>
        {imgDiv(images[1], "50%", {
          boxSizing: "border-box",
          borderBottom: " 5px solid white",
          borderTopRightRadius: "5px"
        })}
        {imgDiv(images[2], "50%", {
          boxSizing: "border-box",
          borderBottomRightRadius: "5px"
        })}
      </Grid>
    </Grid>
  );
}
