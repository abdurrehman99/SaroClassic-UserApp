import React, { Fragment } from "react";
import { CircularProgress, Box } from "@material-ui/core";

export default function FullpageLoader() {
  return (
    // <Box
    //   height="100%"
    //   // width="100vw"
    //   position="absolute"
    //   top="0"
    //   left="0"
    //   right="0"
    //   bottom="0"
    //   style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "99" }}
    // >
    <Fragment>
      <Box
        position="fixed"
        top="0"
        left="0"
        height="100vh"
        width="100vw"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "99" }}
      ></Box>
      <Box
        position="fixed"
        top="50%"
        left="50%"
        style={{ transform: "translate(-50%, -50%)", zIndex: "100" }}
      >
        <CircularProgress style={{ color: "white" }} />
      </Box>
      <Box height={300}></Box>
    </Fragment>
    // </Box>
  );
}
