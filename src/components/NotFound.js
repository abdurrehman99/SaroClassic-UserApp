import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { FullpageLoader } from "./CommonComponents";

export default function NotFound({
  location: { pathname },
  history: { push },
}) {
  const loginRequiredURLS = ["account", "listandsell"];
  useEffect(() => {
    // if (loginRequiredURLS.find((item) => pathname.includes(item))) {
    //   push("/signin");
    // }
  }, []);

  return (
    <Typography
      variant="h4"
      style={{ textAlign: "center", margin: "10vw 0", flex: 1 }}
    >
      {/* {loginRequiredURLS.find((item) => pathname.includes(item)) ? (
        <FullpageLoader />
      ) : ( */}
      404 - Not Found
      {/* )} */}
    </Typography>
  );
}
