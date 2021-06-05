import React, { useState } from "react";
import { CheckOnlineAPIMethod } from "../api/generalClient";
import Login from "./Login";
import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  withStyles,
  ListItemText,
  Button,
  Hidden,
  Slide,
  List,
  ListItem,
  Backdrop,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navBar: {},
  navbarGrid: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  navLink: {
    fontFamily: "Comfortaa ",
    color: theme.palette.secondary.main,
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0px 8px",
    textTransform: "capitalize",
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  active: {
    "&:hover": {
      transform: "scale(1.1)",
    },
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "4px",
    boxShadow: "8px 8px 10px grey",
    color: "white",
  },
  listWrap: {
    "&:hover": {
      transform: "scale(1.1)",
    },
    textAlign: "center",
  },
  Backdrop: {
    zIndex: 2,
    backgroundColor: "transparent",
  },
}));

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  label: {
    textTransform: "capitalize",
  },
}))(Button);

export default function Navbar(props) {
  const classes = useStyles();
  // console.log(localStorage.getItem("isLoggedin"));

  const [login, setLogin] = useState(false);
  const history = useHistory();
  return (
    <>
      <AppBar
        position="static"
        className={classes.navBar}
        elevation={0}
        color="primary"
        style={{ maxHeight: "10%" }}
      >
        <Toolbar>
          <Grid container className={classes.navbarGrid}>
            <Hidden smDown={true}>
              <Grid item>
                <NavLink to="/">
                  <img
                    src="https://res.cloudinary.com/dtkgfy2wk/image/upload/v1620954709/logo_fuhdgl.svg"
                    style={{
                      height: "75px",
                      maxWidth: "100px",
                      alignSelf: "center",
                      padding: "0px",
                      margin: "24px 24px 0px 24px",
                    }}
                    alt=""
                  ></img>
                </NavLink>
              </Grid>
            </Hidden>

            <Grid item>
              <List className={classes.navContainer}>
                <NavLink
                  exact
                  activeClassName={classes.active}
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem className={classes.listWrap}>
                    <ListItemText className={classes.navLink} disableTypography>
                      Home
                    </ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  activeClassName={classes.active}
                  to="/about"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem className={classes.listWrap}>
                    <ListItemText className={classes.navLink} disableTypography>
                      About
                    </ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  activeClassName={classes.active}
                  to="/live"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem className={classes.listWrap}>
                    <ListItemText className={classes.navLink} disableTypography>
                      Trades
                    </ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  activeClassName={classes.active}
                  to="/contact"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem className={classes.listWrap}>
                    <ListItemText className={classes.navLink} disableTypography>
                      Contact
                    </ListItemText>
                  </ListItem>
                </NavLink>
                <ListItem>
                  <StyledButton
                    variant="contained"
                    className={classes.navLink}
                    color="secondary"
                    size="medium"
                    onClick={async (e) => {
                      const sessId = await CheckOnlineAPIMethod();
                      // console.log(sessId.data);
                      if (sessId.data !== undefined && localStorage.getItem("isLoggedin")) {
                        history.push("/dashboard");
                      } else {
                        setLogin((prev) => !prev);
                      }
                    }}
                  >
                    {localStorage.getItem("isLoggedin") ? "Dashboard" : "Login"}
                  </StyledButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Slide direction="left" in={login}>
        <div>
          <Backdrop
            className={classes.Backdrop}
            open={login}
            onClick={(e) => {
              setLogin(false);
            }}
          ></Backdrop>
          <Login setPass={props.setPass} />
        </div>
      </Slide>
    </>
  );
}
