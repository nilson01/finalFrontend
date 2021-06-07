import React, { useEffect } from "react";
import Sidebar from "../components/SideBar";
import UserHeader from "../components/userHeader";

// import { postMessagesAPIMethod } from "../api/adminClient";
import UserMessageCenter from "../components/MessageCenter SubComp/UserMessageCenter";
import AdminMessageCenter from "../components/MessageCenter SubComp/AdminMessageCenter";

import { Grid, Paper, makeStyles } from "@material-ui/core";

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
  const classes = styles();
  useEffect(() => {
    document.title = `Notification`;
  }, []);
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Sidebar />
      <Grid item className={classes.rightbar}>
        <Paper className={classes.rightContainer}>
          <UserHeader page=" Notifications" />
          {JSON.parse(localStorage.getItem("isAdmin")) ? (
            <AdminMessageCenter socket={socket} />
          ) : (
            <UserMessageCenter socket={socket} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
