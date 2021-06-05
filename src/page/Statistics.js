import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import UserHeader from "../components/userHeader";
import Masonry from 'react-masonry-css';
import StatisticsAdmin from '../components/Statistics SubComp/StatisticsAdmin';
import StatisticsUser from '../components/Statistics SubComp/StatisticsUser';
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";

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

export default function ContactUserVAdmin() {

  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const classes = styles();

  const breakpoints = {
    default: 2,
    1100: 2,
    700: 1
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Sidebar />
      <Grid item className={classes.rightbar}>
        <Paper className={classes.rightContainer}>
          <UserHeader page=" Statistics" />

          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            <div>{isAdmin ? <Typography variant="h4" gutterBottom>ADMIN: </Typography> : <Typography variant="h4" gutterBottom>PROFILE: </Typography>}</div>
            {isAdmin ? <StatisticsAdmin /> : <StatisticsUser />}

          </Masonry>
        </Paper>
      </Grid>
    </Grid>
  );
}
