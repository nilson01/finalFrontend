import React from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { green, red } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  cardElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  font: {
    fontFamily: "Inter",
    fontSizeAdjust: "16px",
  },
  boxContainer: {
    flexDirection: "column",
    justify: "flex-start",
    alignItems: "flex-start",
    width: "70%",
  },
  win: {
    backgroundColor: theme.palette.warning.light,
  },
}));

export default function ResultCard(props) {
  const classes = styles();
  return (
    <Card className={classes.cardContainer}>
      <CardContent
        className={`${classes.cardElement} ${
          props.status === "won" ? classes.win : null
        }`}
      >
        <Box>
          {props.trend === "put" ? (
            <ArrowDownwardIcon fontSize="large" style={{ color: red[700] }} />
          ) : (
            <ArrowUpwardIcon fontSize="large" style={{ color: green[700] }} />
          )}
        </Box>
        <Box display="flex" className={classes.boxContainer}>
          <Typography>Investment: ${props.amount / 100}</Typography>
          <Typography>Return: ${props.win / 100}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
