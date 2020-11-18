import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactPhotoCollage } from "react-photo-collage";
import { ROUTES } from "../../utils/api/routes";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "#f7f7f7",
    padding: theme.spacing(1, 2),
    border: "1px solid #d6d6d6",
    borderRadius: "0 10px 10px",
    width: "75%",
    marginBottom: theme.spacing(1.5),
  },
  flag: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

export default function ChatItem({
  content: { date, message, sender, attachment },
  user,
}) {
  const classes = useStyles();
  const isUser = sender === "user";
  const isImages = !!attachment;
  const [images, setImages] = useState([]);

  const getPropsGrid = (n = images.length) => {
    return {
      height: ["80px"],
      width: n < 4 ? `${25 * n}%` : "100%",
      layout: n < 4 ? [n] : [4],
      showNumOfRemainingPhotos: images.length > 4,
      photos: images,
    };
  };

  useEffect(() => {
    if (isImages) {
      setImages(
        attachment.map((img) => ({
          src: img,
        }))
      );
    }
  }, []);

  return (
    <Box
      className={classes.mainContainer}
      style={
        isUser
          ? {
              borderRadius: "10px 0px 10px 10px",
              alignSelf: "flex-end",
              backgroundColor: "#1c1c1c",
              color: "white",
            }
          : {}
      }
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Typography variant="body2">
            {isUser ? user.name : "Admin"}
          </Typography>
          <Typography variant="caption" className={classes.flag}>
            <span class="flag-icon flag-icon-pk"></span> Pakistan
          </Typography>
        </Box>
        <Typography variant="caption">
          {new Date(date).toTimeString()}
        </Typography>
      </Box>
      <Divider
        className={classes.divider}
        style={sender === "user" ? { background: "white" } : {}}
      />
      {images.length ? (
        <ReactPhotoCollage {...getPropsGrid()} />
      ) : (
        <Typography variant="body2">{message}</Typography>
      )}
    </Box>
  );
}
