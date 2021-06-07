import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import UserHeader from "../components/userHeader";

// import { postMessagesAPIMethod } from "../api/adminClient";
import ContactUser from "../components/SendMessage SubComp/adminSendMessage";
import ContactAdmin from "../components/SendMessage SubComp/userSendMessage";

import { Grid, Paper, makeStyles, Container } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
  rightbar: {
    display: "flex",
    height: "100%",
    width: "80%",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    height: "95%",
    width: "95%",
    backgroundColor: theme.palette.primary.dark,
  },
  contentContainer: {
    height: "85%",
    width: "100%",
  },
}));

export default function ContactUserVAdmin({ socket }) {
  const localUser = JSON.parse(localStorage.getItem("isAdmin"));
  const [isAdmin] = useState(localUser);
  const classes = styles();

  useEffect(() => {
    document.title = `Contact center`;
  }, []);

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Sidebar />
      <Grid item className={classes.rightbar}>
        <Paper className={classes.rightContainer}>
          <UserHeader page="Send Notification" />
          <Container size="sm">
            {isAdmin ? <ContactUser socket={socket} /> : <ContactAdmin socket={socket} />}
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
