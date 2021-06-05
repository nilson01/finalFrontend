import React, { useState } from "react";
import { makeStyles, Grid, Box, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { LogoutAPIMethod } from "../api/generalClient";
import UserSidebar from "./SideBar SubComp/userSidebar";
import AdminSidebar from "./SideBar SubComp/adminSidebar";
const styles = makeStyles((theme) => ({
  sidebar: {
    height: "100%",
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sidebarContent: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
    marginTop: "3%",
    justifyContent: "center",
  },
  icons: {
    fontSize: "50px",
    margin: "10%",
    color: "grey",
  },
}));

export default function SideBar() {
  const classes = styles();
  const history = useHistory();
  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const onClick_logout = async () => {
    try {
      LogoutAPIMethod();
      localStorage.clear();
      history.push("/");
    } catch (err) {
      alert(err.response);
    }
  };
  return (
    <Grid item className={classes.sidebar}>
      <Box
        display="flex"
        className={`${classes.sidebar} ${classes.sidebarContent}`}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          <img
            src="https://res.cloudinary.com/dtkgfy2wk/image/upload/v1620954709/logo_fuhdgl.svg"
            style={{ height: "75px", width: "100px" }}
            alt="Company Logo"
          ></img>
        </a>
      </Box>
      <Box
        display="flex"
        className={`${classes.sidebar} ${classes.sidebarContent}`}
        style={{ height: "70%" }}
      >
        {isAdmin ? <AdminSidebar /> : <UserSidebar />}
      </Box>
      <Box>
        <IconButton color="secondary" onClick={onClick_logout}>
          <ExitToAppIcon style={{ fontSize: "50px" }} />
        </IconButton>
      </Box>
    </Grid>
  );
}
