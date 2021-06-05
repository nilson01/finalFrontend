import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar";
import Chart from "react-apexcharts";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import UserHeader from "../userHeader";
import { getBinomoDealsAPIMethod } from "../../api/profileClient";

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

export default function MessageCenter() {
  const [chartOption] = useState({
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    yaxis: {
      title: {
        text: "Profit",
      },
    },
    colors: ["#0b4870"],
  });
  const [series, setSeries] = useState([
    {
      name: "Data-1",
      data: [],
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (!localStorage.getItem("graphData")) {
          var data = await getBinomoDealsAPIMethod(90);
          data = data.data;
          localStorage.setItem("graphData", JSON.stringify(data));
        }
        var temp = localStorage.getItem("graphData");
        var arrCandle = [0];
        temp = JSON.parse(temp).data;
        temp.forEach((el) => {
          arrCandle.push(
            (
              arrCandle[arrCandle.length - 1] -
              el.amount / 100 +
              el.win / 100
            ).toFixed(2)
          );
        });
        // console.log(arrCandle);
        setSeries([
          {
            name: "Data-1",
            data: arrCandle,
          },
        ]);
      } catch (err) {
        alert("Error found");
      }
    }
    fetchData();
  }, []);
  const classes = styles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Sidebar />
      <Grid item className={classes.rightbar}>
        <Paper className={classes.rightContainer}>
          <UserHeader page="Transactions" />
          <Container className={classes.contentContainer}>
            <Chart
              options={chartOption}
              series={series}
              type="line"
              width="100%"
              height="90%"
            ></Chart>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
