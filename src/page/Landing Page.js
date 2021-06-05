import React from "react";
import Navbar from "../components/NavBar";
import {
  Box,
  makeStyles,
  Grid,
  withStyles,
  Typography,
  Button,
} from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

const styles = makeStyles((theme) => ({
  innerContainer: {
    width: "95%",
    backgroundColor: theme.palette.primary.main,
    margin: "0px 2%",
    boxSizing: "border-box",
  },
  creative: {
    color: "black",
    fontFamily: "Inter",
    fontSize: "56px",
    fontWeight: "medium",
  },
  solutions: {
    color: theme.palette.secondary.main,
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "80px",
  },
  body: {
    fontFamily: "Inter",
    fontWeight: "light",
    fontSize: "24px",
  },
}));

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "50%",
  },
  label: {
    textTransform: "capitalize",
    fontSize: "24px",
  },
}))(Button);

const Landing = () => {
  const classes = styles();
  return (
    <>
     
      <Box
        display="flex"
        style={{
          height: "90vh",
          alignItems: "center",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ justifyContent: "space-between" }}
          className={classes.innerContainer}
        >
          <Grid item>
            <Box
              display="flex"
              style={{
                flexDirection: "column",

                alignItems: "flex-start",
              }}
            >
              <Typography variant="h3" className={classes.creative}>
                Creative
              </Typography>
              <Typography variant="h2" className={classes.solutions}>
                Solutions
              </Typography>
              <br />
              <Typography variant="body1" className={classes.body}>
                Binary option predictor using machine learning
              </Typography>
              <br />
              <StyledButton size="large">Learn More</StyledButton>
              <br />
              <Box display="flex" style={{ flexDirection: "row" }}>
                <InstagramIcon
                  fontSize="large"
                  color="secondary"
                  style={{ margin: "20px 20px 20px 0px" }}
                />
                <TwitterIcon
                  fontSize="large"
                  color="secondary"
                  style={{ margin: "20px" }}
                />
                <FacebookIcon
                  fontSize="large"
                  color="secondary"
                  style={{ margin: "20px 0px 20px 20px" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <img
              src="https://res.cloudinary.com/dtkgfy2wk/image/upload/v1620962204/picture_pqypsw.svg"
              style={{ height: "75%" }}
              alt=""
            ></img>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Landing;
