import React from "react";

export default function ImageDivBackground({
  image,
  height = "100%",
  width = "100%",
  borderRadius = "0",
  backgroundSize = "cover",
  style = {},
  className = ""
}) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor: "#f7f7f7",
        backgroundPosition: "center",
        backgroundSize,
        backgroundRepeat: "no-repeat",
        height,
        width,
        borderRadius,
        ...style
      }}
    ></div>
  );
}
