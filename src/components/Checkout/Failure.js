import React from "react";
import { Typography, Box } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

export default function Success(props) {
  return (
    <Box textAlign="center" mt={3} py={10}>
      <ErrorOutline fontSize="large" />
      <Typography variant="h5">Payment/Order Failed</Typography>
    </Box>
  );
}
