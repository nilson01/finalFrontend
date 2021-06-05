import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles, Snackbar } from "@material-ui/core";
import { NotifyAPIMethod } from "../../api/adminClient";
import MuiAlert from "@material-ui/lab/Alert";
// import { io } from "socket.io-client";
// var socket = io.connect('http://localhost:5000');


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
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

export default function MessageCenter(props) {
  const classes = styles();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title || !details) {
        if (!title) setTitleError(true);
        if (!details) setDetailsError(true);
        return;
      }
      setTitleError(false);
      setDetailsError(false);

      if (title === "") {
        setTitleError(true);
      }
      if (details === "") {
        setDetailsError(true);
      }
      if (title && details) {
        // console.log(localStorage.getItem("name"), localStorage.getItem("email"), title, details);
        await NotifyAPIMethod({
          Date: new Date(),
          Title: category + " : " + title,
          Notice: details,
        });
        props.socket.emit('notification', {
          Date: new Date(),
          Title: category + " : " + title,
          Notice: details,
        });
        onClick_send(e);
      }
    } catch (err) {
      // console.log("FrontEnd: ", err);
      setSnackbarMessage(err.response);
      setStatus("error");
      setOpen(true);
    }
  };

  const handleClose = (e, reason) => {
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
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        onChange={(e) => setTitle(e.target.value)}
        label="Notification Title"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={titleError}
      />
      <TextField
        className={classes.field}
        onChange={(e) => setDetails(e.target.value)}
        label="Details"
        variant="outlined"
        color="secondary"
        multiline
        rows={4}
        fullWidth
        required
        error={detailsError}
      />
      <FormControl className={classes.field}>
        {/* <FormLabel>Notification Category</FormLabel> */}
        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel
            value="URGENT*"
            control={<Radio />}
            label="URGENT*"
          />
          <FormControlLabel
            value="Daily reminders"
            control={<Radio />}
            label="Daily reminders"
          />
          <FormControlLabel
            value="Monthly notice"
            control={<Radio />}
            label="Monthly notice"
          />
        </RadioGroup>
      </FormControl>

      <StyledButton type="submit">Send</StyledButton>

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
    </form>
  );
}
