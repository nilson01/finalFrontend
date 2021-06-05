import React, { useEffect, useState } from "react";
import TransactionCard from "../TransactionCard";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {
  Box,
  makeStyles,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { getBinomoDealsAPIMethod } from "../../api/profileClient";

const styles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: "2%",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "45%",
    backgroundColor: theme.palette.secondary.main,
  },
  fontBody: {
    fontFamily: "Comfortaa",
    fontWeight: "regular",
    fontSize: "12px",
  },
  fontSeparator: {
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    fontSize: "24px",
    color: theme.palette.secondary.main,
    marginBottom: "1%",
  },
}));

export default function UserDashboard() {
  const history = useHistory();
  const classes = styles();
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await getBinomoDealsAPIMethod(5, (res) => {
          // console.log(res.data.data);
          setDeals(res.data.data);
        });
      } catch (err) {
        alert(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Container className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Box display="flex" style={{ justifyContent: "space-between" }}>
              <Typography className={classes.fontBody} color="primary">
                My Balance
              </Typography>
              <Typography className={classes.fontBody} color="primary">
                Demo
              </Typography>
            </Box>
            <Box
              display="flex"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                height: "70px",
              }}
            >
              <Typography
                className={classes.fontBody}
                style={{ fontSize: "32px", fontWeight: "bold" }}
                color="primary"
              >
                {`$ ${(Number(localStorage.getItem("balance")) / 100).toFixed(
                  2
                )}`}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card className={classes.card} style={{ backgroundColor: "white" }}>
          <CardContent
            className={classes.fontBody}
            style={{ alignItems: "space-between" }}
          >
            <Box display="flex">
              <Typography
                className={classes.fontBody}
                color="secondary"
                style={{ justifySelf: "flex-start" }}
              >
                Last 24 Hours
              </Typography>
            </Box>
            <br />

            <Box
              display="flex"
              style={{ justifyContent: "space-even" }}
              direction="row"
            >
              <IconButton
                onClick={() => {
                  history.push("/graph");
                }}
                disableRipple={true}
                disableFocusRipple={true}
                edge={false}
              >
                <EqualizerOutlinedIcon
                  style={{
                    zIndex: "2",
                    alignSelf: "center",
                    justifySelf: "center",
                    height: "75px",
                    width: "75px",
                    left: "10",
                    backgroundColor: "#B0D2E8",
                    borderRadius: "50%",
                    padding: "12px",
                    boxSizing: "border-box",
                  }}
                  color="secondary"
                />
              </IconButton>
              <Box
                display="flex"
                style={{
                  flexDirection: "column",
                  justifyItems: "flex-start",
                  alignItems: "baselines",
                  marginLeft: "10%",
                }}
              >
                <Box display="flex">
                  <ArrowUpwardIcon
                    style={{
                      color: "green",
                      backgroundColor: "lightgreen",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                  <Typography
                    className={classes.fontBody}
                    style={{
                      alignSelf: "flex-start",
                      fontSize: "18px",
                      color: "green",
                    }}
                  >
                    {`2.50%`}
                  </Typography>
                </Box>

                <br />
                <Typography
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "18px",
                    color: "green",
                  }}
                  className={classes.fontBody}
                >
                  5.00 in profit
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Container display="flex" className={classes.cardContainer}>
        <Typography className={classes.fontSeparator}>
          Last 5 Transactions
        </Typography>
      </Container>
      <Box
        display="flex"
        style={{
          height: "50%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {deals.map((el, index) => (
          <TransactionCard
            name={el.asset_name}
            amount={el.amount}
            return={el.win}
            status={el.status}
            key={index}
          />
        ))}
      </Box>
    </>
  );
}
