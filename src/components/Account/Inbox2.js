import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Button,
  Icon
} from "@material-ui/core";
import {
  StarRateOutlined,
  LocationOnOutlined,
  PersonOutlineOutlined,
  AttachFileOutlined,
  SendOutlined
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { sampleAvatars } from "../../utils/contentConstants";
import ChatItem from "./ChatItem";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // backgroundColor: "gray",
    // margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: "calc(100vh - 115px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 175px)"
    }
  },
  avatar: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxShadow: theme.shadows[8]
  },
  flex: {
    display: "flex",
    alignItems: "center"
    // justifyContent: "center"
  },
  icon: {
    color: "#ffae00",
    fontSize: theme.typography.h6.fontSize
  },
  sectionPadding: {
    padding: theme.spacing(3)
  },
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginTop1: {
    marginTop: theme.spacing(1)
  },
  divider: {
    width: "80%",
    margin: "auto"
  },
  input: {
    display: "none"
  },
  chatBody: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflowY: "scroll"
  },
  gridItem: {
    padding: theme.spacing(0, 1)
  },
  button: {
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1)
  }
}));

export default function Inbox() {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={3} className={classes.gridItem}>
        <Typography variant="body1">
          <b>Recent Conversations</b>
        </Typography>
        <List>
          <ListItem style={{ backgroundColor: "#f7f7f7" }}>
            <ListItemAvatar>
              <Avatar>
                <img src={sampleAvatars[0]} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Maria" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img src={sampleAvatars[1]} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Hena" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img src={sampleAvatars[2]} width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="June" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </Grid>
      <Grid
        item
        xs={6}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
        className={classes.gridItem}
      >
        <Typography variant="body1">
          <b>Maria</b>
        </Typography>
        <Box className={classes.chatBody}>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </Box>
        <Box display="flex" alignItems="flex-end">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <AttachFileOutlined />
            </IconButton>
          </label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type Message"
            margin="none"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendOutlined />}
            // size="small"
            className={classes.button}
          >
            Send
          </Button>
        </Box>
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Typography variant="body1">
          <b>About User</b>
        </Typography>
        <Paper elevation={8}>
          <Box p={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <div
                className={classes.avatar}
                style={{ backgroundImage: `url(${sampleAvatars[0]})` }}
              ></div>
              <Box py={2}>
                <Typography variant="body1">
                  <b>Georgia O'Keeffe</b>
                </Typography>
                <Typography variant="body2" className={classes.flex}>
                  <StarRateOutlined className={classes.icon} /> 4.5 (505 Orders)
                </Typography>
              </Box>
              <Divider className={classes.divider} />
            </Box>
            <Box pt={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <LocationOnOutlined className={classes.icon} /> From
                </Typography>
                <Typography variant="body2">
                  <b>Pakistan</b>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <PersonOutlineOutlined className={classes.icon} /> Member
                  Since
                </Typography>
                <Typography variant="body2">
                  <b>Aug 2018</b>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" className={classes.flex}>
                  <LocationOnOutlined className={classes.icon} /> From
                </Typography>
                <Typography variant="body2">
                  <b>h</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
