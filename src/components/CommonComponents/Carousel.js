import React, { Fragment } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  carouselBtn: {
    position: "absolute",
    top: "40%",
    backgroundColor: "rgba(28,28,28,0.3)",
    color: "white",
  },
  left: {
    left: "10px",
  },
  right: {
    right: "10px",
  },
}));

export default function Carousel({
  content,
  noButtons,
  noResponsive,
  autoPlay,
  dots,
}) {
  const classes = useStyles();
  let carouselRef;
  //250 width
  const _autoplay = autoPlay ? { autoPlay: true, autoPlayInterval: 3000 } : {};
  const responsive = noResponsive
    ? null
    : {
        0: {
          items: 1,
        },
        560: {
          items: 1.5,
        },
        720: {
          items: 2,
        },
        960: {
          items: 3,
        },
        1280: {
          items: 4,
        },
      };

  return (
    <div style={{ position: "relative" }}>
      <AliceCarousel
        mouseTrackingEnabled
        buttonsDisabled
        responsive={responsive}
        dotsDisabled={dots ? false : true}
        {..._autoplay}
        ref={(el) => {
          carouselRef = el;
        }}
      >
        {content.map((ele) => ele)}
      </AliceCarousel>
      {!noButtons && (
        <Fragment>
          <IconButton
            className={`${classes.carouselBtn} ${classes.left}`}
            onClick={() => carouselRef.slidePrev()}
          >
            <ArrowBackIosOutlined />
          </IconButton>
          <IconButton
            className={`${classes.carouselBtn} ${classes.right}`}
            onClick={() => carouselRef.slideNext()}
          >
            <ArrowForwardIosOutlined />
          </IconButton>
        </Fragment>
      )}
    </div>
  );
}
