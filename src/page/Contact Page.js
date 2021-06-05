import { React, useState } from "react";
import { ContactUsInfoAPIMethod } from "../api/generalClient";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  withStyles,
  TextField,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

// import { io } from "socket.io-client";
// var socket = io.connect('http://localhost:5000');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = makeStyles((theme) => ({
  bodyContainer: {
    height: "80vh",
    width: "100vw",
    backgroundColor: theme.palette.primary.main,
    alignItems: "inline",
    display: "flex",
  },
  contact: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "64px",
    color: theme.palette.secondary.main,
  },
  input: {
    margin: "2%",
  },
}));
const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "300px",
  },
  label: {
    textTransform: "capitalize",
    fontSize: "24px",
  },
}))(Button);

const Contact = (props) => {
  const classes = styles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const onChange_name = (e) => {
    // console.log(nameError);
    if (nameError) setNameError(false);
    setName(e.target.value);
  };

  const onChange_email = (e) => {
    if (emailError) setEmailError(false);
    setEmail(e.target.value);
  };

  const onChange_message = (e) => {
    if (messageError) setMessageError(false);
    setMessage(e.target.value);
  };

  const sendContactInfo = async (e) => {
    // console.log([name, email, message]);

    try {
      if (!name || !email || !message) {
        // console.log(name, email, message);
        if (!name) setNameError(true);
        if (!email) setEmailError(true);
        if (!message) setMessageError(true);
        return;
      }
      await ContactUsInfoAPIMethod({
        name: name,
        email: email,
        date: Date.now(),
        message: message,
      });
      props.socket.emit('message', {
        name: name,
        email: email,
        date: Date.now(),
        message: message
      });
      onClick_send(e);
    } catch (err) {
      // console.log("FrontEnd: ", err);
      setSnackbarMessage(err.response);
      setStatus("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };




  const onClick_send = (e) => {
    setSnackbarMessage("Message Sent!");
    setStatus("success");
    setOpen(true);
  };
  return (
    <>
     
      <Container className={classes.bodyContainer}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2" className={classes.contact}>
              Contact Us
            </Typography>
          </Grid>
          <Grid item style={{ width: "50%" }}>
            <TextField
              placeholder="John Doe"
              label="Name"
              fullWidth
              onChange={onChange_name}
              className={classes.input}
              required={true}
              error={nameError}
            />

            <TextField
              placeholder="johndoe@email.com"
              label="Email"
              fullWidth
              onChange={onChange_email}
              className={classes.input}
              required={true}
              error={emailError}
            />

            <TextField
              placeholder="Enter your message"
              label="Message"
              fullWidth
              multiline
              rows={5}
              onChange={onChange_message}
              className={classes.input}
              required={true}
              error={messageError}
            />
          </Grid>
          <Grid item>
            <StyledButton onClick={sendContactInfo}>Send</StyledButton>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={status}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;
