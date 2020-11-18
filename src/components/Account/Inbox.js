import React, { useEffect, useState, createRef } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  FiberManualRecord,
  AttachFileOutlined,
  SendOutlined
} from "@material-ui/icons";
import ChatItem from "./ChatItem";
import { fetchInbox, uploadAttachment } from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  status: {
    color: "green",
    listStyleType: "square",
    "& *": {
      fontSize: "8px"
    }
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 130px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 190px)"
    }
  },
  chatBody: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflowY: "scroll",
    borderColor: "#f7f7f7",
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "5px",
    padding: theme.spacing(2)
  },
  chatInput: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "flex-end"
  },
  textBox: {
    padding: theme.spacing(0, 1)
  }
}));

function Inbox({
  inbox,
  fetchInbox,
  uploadAttachment,
  currentUser: { user },
  history: { push }
}) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  let bodyref = createRef();
  const sendMessage = () => {
    fetchInbox(user._id, message);
    setMessage("");
  };
  const sendAttachement = ({ target: { files } }) => {
    uploadAttachment(user._id, files);
  };

  useEffect(() => {
    fetchInbox(user._id);
  }, []);

  useEffect(() => {
    bodyref.current.scrollIntoView({ behavior: "smooth" });
  }, [inbox]);

  return (
    <Container maxWidth="md">
      <Box className={classes.mainContainer}>
        <Box>
          <Typography variant="h3">Inbox</Typography>
          <Typography variant="h6">
            Administrator AfricanArt.International
          </Typography>
          <Typography variant="caption" className={classes.status}>
            <FiberManualRecord /> Online
          </Typography>
        </Box>
        <Box className={classes.chatBody}>
          {inbox.map(item => (
            <ChatItem content={item} user={user} />
          ))}
          <div ref={bodyref}></div>
        </Box>
        <Box className={classes.chatInput}>
          <input
            type="file"
            accept="image/*"
            multiple
            id="attachment"
            style={{ display: "none" }}
            onChange={sendAttachement}
          />
          <label htmlFor="attachment">
            <IconButton component="span" size="small">
              <AttachFileOutlined />
            </IconButton>
          </label>
          <TextField
            placeholder="Type Something"
            fullWidth
            multiline
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            className={classes.textBox}
          />
          <Button
            variant="contained"
            startIcon={<SendOutlined />}
            size="small"
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const mapStateToProps = ({ inbox, currentUser }) => ({ inbox, currentUser });

export default connect(mapStateToProps, { fetchInbox, uploadAttachment })(
  Inbox
);
