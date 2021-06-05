import React from "react";
import Sidebar from "../components/SideBar";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import UserHeader from "../components/userHeader";
import FormElement from "../components/FormElement";

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

export default function Dashboard() {
  const classes = styles();
  return (
    <div>
      <Grid container alignItems="center" className={classes.root}>
        <Sidebar />
        <Grid item className={classes.rightbar}>
          <Paper className={classes.rightContainer}>
            <UserHeader page="Robot Settings" />
            <Container className={classes.contentContainer}>
              <Paper style={{ height: "100%", width: "100%" }}>
                <Container
                  style={{
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    paddingTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <FormElement />
                </Container>
              </Paper>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
