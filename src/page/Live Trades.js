import React, { useState, useEffect } from "react";
import { Paper, makeStyles, Grid, Typography, Box } from "@material-ui/core";
//import useWebSocket from "react-use-websocket";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import axios from "axios";

const styles = makeStyles((theme) => ({
  bodyContainer: {
    height: "80vh",
    width: "95vw",
    backgroundColor: theme.palette.primary.main,
    alignItems: "inline",

    margin: "0px 2%",
    display: "flex",
  },
  leftContainer: {
    height: "100%",
    width: "80%",
  },
  rightContainer: {
    height: "100%",
    width: "30%",
  },
  predictor: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "36px",
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: "5%",
  },
}));

const Live = () => {
  //const [price, setCurrPrice] = useState(0);

  useEffect(() => {
    var a = setInterval(async () => {
      var temp = await axios.get("/api/candles/");
      temp = temp.data.data;
      var temp2 = [];
      var resMax,
        resMin = 0;
      // console.log(temp);
      temp.forEach((el) => {
        var result = [el.open, el.high, el.low, el.close];
        temp2.push({
          x: el.created_at,
          y: result,
        });
        if (resMax < Math.max(...result)) resMax = Math.max(...result);
        if (resMin === 0 || resMin > Math.min(...result))
          resMin = Math.min(...result);
      });
      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: temp2,
        },
      ]);
      ApexCharts.exec("realtime", "updateOptions", {
        yaxis: { min: resMin, max: resMax },
      });
    }, 5000);

    return () => {
      clearInterval(a);
    };
  }, []);
  const [candleData] = useState([
    {
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33],
    },
    {
      x: new Date(1538780400000),
      y: [6632.01, 6643.59, 6620, 6630.11],
    },
    {
      x: new Date(1538782200000),
      y: [6630.71, 6648.95, 6623.34, 6635.65],
    },
    {
      x: new Date(1538784000000),
      y: [6635.65, 6651, 6629.67, 6638.24],
    },
    {
      x: new Date(1538785800000),
      y: [6638.24, 6640, 6620, 6624.47],
    },
  ]);

  const [state] = useState({
    series: [
      {
        name: "series-1",
        data: candleData,
      },
    ],
    options: {
      colors: ["#ffffff"],
      chart: {
        foreColor: "#fff",
        id: "realtime",
        height: 350,
        type: "candle",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "5 Last Candles",
        align: "left",
        style: {
          color: "#ffffff",
        },
      },
      markers: {
        size: 0,
      },

      legend: {
        show: false,
      },
      yaxis: {
        max: 641.8685016,
        min: 641.8684983,
      },
    },
  });
  const classes = styles();

  /*const { sendJsonMessage } = useWebSocket("wss://as.binomo.com/", {
    onOpen: () => {
      sendJsonMessage({ action: "subscribe", rics: ["Z-CRY/IDX"] });
    },
    shouldReconnect: () => true,
    onMessage: (e) => {
      e = JSON.parse(e.data);
      if ("assets" === e.data[0].action) {
        setCurrPrice(e.data[0].assets[0].rate);
      }
    },
  });*/

  return (
    <>

      <Paper elevation={0} className={classes.bodyContainer}>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          direction="row"
          className={classes.leftContainer}
        >
          <Grid item>
            <Box display="flex">
              <Typography className={classes.predictor} color="secondary">
                Live Trades
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            style={{
              width: "100%",
              height: "88.5%",
            }}
            className={classes.secondary}
            id="chart"
          >
            <Chart
              options={state.options}
              series={state.series}
              type="candlestick"
              width="100%"
              height="100%"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Live;
