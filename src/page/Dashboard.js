import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";

import { Grid, Paper, makeStyles } from "@material-ui/core";

import UserHeader from "../components/userHeader";
import UserDashboard from "../components/Dashboard SubComp/UserDashboard";
import AdminDashboard from "../components/Dashboard SubComp/adminDashboard";
import { getBinomoDealsAPIMethod } from "../api/profileClient";
import { getprofileurlAPIMethod } from "../api/profileClient";

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
}));

export default function Dashboard(props) {
  // console.log("Dashboard",props.pass);
  // console.log(localStorage.getItem("isAdmin"));

  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [executed, setExecuted] = useState(false);
  const classes = styles();
  var doOnce = () => {
    if (!executed) {
      setExecuted(true);
      localStorage.setItem("isLoggedin", true);
    }
  };
  doOnce();
  const sendLoginInfo = async () => {
    try {
      await getprofileurlAPIMethod((res) => {
        console.log(res.data.data);
        localStorage.setItem("balance", res.data.data.balance);
        localStorage.setItem("accountType", res.data.data.accountType);
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("profile_url", res.data.data.profile_url);
        localStorage.setItem(
          "setting",
          JSON.stringify(res.data.data.setting)
        );
        localStorage.setItem("isAdmin", res.data.data.isAdmin);
        localStorage.setItem("email", res.data.data.email);
      });

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    document.title = `Dashboard`;
    async function fetchData() {
      try {
        await getBinomoDealsAPIMethod(10, (res) => {
          let won = 0;
          let loss = 0;
          let tie = 0;
          res.data.data.forEach((element) =>
            element.status === "won"
              ? (won = won + 1)
              : element.status === "lost"
                ? (loss = loss + 1)
                : (tie = tie + 1)
          );
          localStorage.setItem("seriesD", [won, loss, tie]);
        });
      } catch (err) {
        alert(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Sidebar />
      <Grid item className={classes.rightbar}>
        <Paper className={classes.rightContainer}>
          {(localStorage.getItem("isAdmin") === null) ? sendLoginInfo() : null}
          <UserHeader page="Dashboard" />
          {isAdmin ? <AdminDashboard pass={props.pass} /> : <UserDashboard />}
        </Paper>
      </Grid>
    </Grid>
  );
}
