import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  NativeSelect,
  Button,
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
  fontSeparator: {
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    fontSize: "18px",
    color: theme.palette.secondary.main,
    justifySelf: "left",
  },
  formLabel: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "85%",
  },
  boxContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "flex-start",
  },
}));
const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "30%",
    alignSelf: "center",
  },
  label: {
    textTransform: "capitalize",
  },
}))(Button);
export default function PaymentElement() {
  const classes = styles();
  const [payment, setPayment] = useState("bank");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [option, setOption] = useState("cryptocurrency");
  const [password, setPassword] = useState("");
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleWithdrawAmount = (e) => {
    setWithdrawAmount(e.target.value);
  };
  const handleDepositAmount = (e) => {
    setDepositAmount(e.target.value);
  };
  const handleAccount = (e) => {
    setAccount(e.target.value);
  };
  const handleOption = (e) => {
    setOption(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <NativeSelect value={payment} onChange={handlePayment}>
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="Paypal">Paypal</option>
            </NativeSelect>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Payment Method
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={account}
              onChange={handleAccount}
              label="Enter your account no. "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Account No.</Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={withdrawAmount}
              onChange={handleWithdrawAmount}
              InputProps={{ startAdornment: "$" }}
              label="Enter Amount: "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Amount</Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={password}
              onChange={handlePassword}
              label="Enter your password "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Password</Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        control={<StyledButton>Withdraw</StyledButton>}
        label={<Typography></Typography>}
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={depositAmount}
              onChange={handleDepositAmount}
              InputProps={{ startAdornment: "$" }}
              label="Enter Amount: "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Amount</Typography>
        }
        labelPlacement="start"
        className={classes.formLabel}
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <NativeSelect value={option} onChange={handleOption}>
              <option value="cryptocurrency">Cryptocurrency</option>
              <option value="bank">Bank Transfer</option>
              <option value="cc">Credit/Debit Card</option>
              <option value="paypal">Paypal</option>
            </NativeSelect>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Payment Option
          </Typography>
        }
        labelPlacement="start"
        className={classes.formLabel}
      />
      <FormControlLabel
        control={<StyledButton variant="contained">Deposit</StyledButton>}
        label={<Typography className={classes.fontSeparator}></Typography>}
        style={{ marginBottom: "16px" }}
      ></FormControlLabel>
    </>
  );
}
