import React, { useEffect } from "react";
import { Box, makeStyles, Grid, Typography } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  innerContainer: {
    backgroundColor: theme.palette.primary.main,
    margin: "0px 2%",
    height: "90%",
  },
  body: {
    fontFamily: "Inter",
    fontWeight: "light",
    fontSize: "24px",
  },
  fontSeparator: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "40px",

    color: theme.palette.secondary.main,
    marginBottom: "1%",
  },
}));

const About = () => {
  const classes = styles();
  useEffect(() => {
    document.title = `About us`;
  }, []);
  return (
    <>

      <Box
        display="flex"
        style={{
          height: "80vh",
          alignItems: "center",
          // border: "2px solid red",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{
            justifyContent: "space-between",
          }}
          className={classes.innerContainer}
        >
          <Grid
            item
            style={{
              // border: "2px solid yellow",
              height: "70%",
              width: "50%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dtkgfy2wk/image/upload/v1622619080/aboutuspicture_ubaw9q.svg"
              alt=""
            ></img>
          </Grid>
          <Grid
            item
            style={{
              height: "90%",
              // border: "2px solid red",
              width: "48%",
            }}
          >
            <Box
              display="flex"
              style={{
                flexDirection: "column",
                height: "100%",
                width: "90%",
              }}
            >
              <Typography variant="h2" className={classes.fontSeparator}>
                What if you can invest money without any skills?
              </Typography>

              <br />
              <Typography
                variant="body1"
                className={classes.body}
                style={{
                  height: "90%",
                }}
              >
                You are in a right place: We use binary option predictor using
                machine learning and give you a huge profit. Just a click away.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
                officia pariatur omnis in exercitationem perferendis
                reprehenderit dolores. Architecto iusto praesentium ea, vero rem
                voluptatibus nulla velit labore sit possimus ab.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
