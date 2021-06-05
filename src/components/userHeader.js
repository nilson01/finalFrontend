import React, { useState, useEffect } from "react";
import { Container, Typography, Box, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const styles = makeStyles((theme) => ({
  profileName: {
    fontFamily: "Comfortaa",
    fontSize: "16px",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  title: {
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    fontSize: "48px",
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
}));

export default function UserHeader(props) {
  const [name] = useState(localStorage.getItem("name").toUpperCase());
  const [accountType] = useState(localStorage.getItem("accountType"));
  const [profile_url, setProfile_url] = useState(
    localStorage.getItem("profile_url")
  );

  const checkProfileUrl = () => {
    if (props.profile)
      return props.profile
    else {
      return profile_url
    }
  };
  useEffect(() => {
    // setProfile_url(localStorage.getItem("profile_url"));
  }, []);

  const classes = styles();
  return (
    <Container className={classes.header}>
      <Typography className={classes.title}>{`${props.page}`}</Typography>
      <Box
        display="flex"
        style={{
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <NavLink to="/profile">
          <img
            src={checkProfileUrl()}
            style={{
              height: "75px",
              width: "75px",
              margin: "8px 24px 8px 0",
              borderRadius: "50%",
            }}
            alt="user profile"
          ></img>
        </NavLink>

        <Box
          display="flex"
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography className={classes.profileName}>{name}</Typography>
          <Typography color="secondary">{accountType}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
