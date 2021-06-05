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
  Switch,
} from "@material-ui/core";
import { changeProfileAPIMethod } from "../api/profileClient";

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
export default function SettingsElement() {
  const classes = styles();
  const [automatic, setAutomatic] = useState(true);
  const [startAmount, setStartAmount] = useState(0);
  const [maxProfit, setMaxProfit] = useState(0);
  const [timeframe, setTimeFrame] = useState(1);

  const handleAutomatic = (e) => {
    setAutomatic((prev) => !prev);
  };
  const handleStartAmount = (e) => {
    setStartAmount(e.target.value);
  };
  const handleTimeFrame = (e) => {
    setTimeFrame(e.target.value);
  };
  const handleMaxProfit = (e) => {
    setMaxProfit(e.target.value);
  };

  const onClickSave = async (e) => {
    try {
      changeProfileAPIMethod({
        setting: {
          activateRobot: automatic,
          time: timeframe,
          maxProfit: maxProfit,
          startingAmount: startAmount,
        },
      });
    } catch (err) {
      alert(err.response);
    }
  };
  return (
    <>
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <Switch
              checked={automatic}
              onChange={handleAutomatic}
              name="automatic"
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Automatic</Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={startAmount}
              onChange={handleStartAmount}
              InputProps={{ startAdornment: "$" }}
              label="Enter Amount: "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Starting Investment
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={maxProfit}
              onChange={handleMaxProfit}
              InputProps={{ startAdornment: "$" }}
              label="Enter Amount: "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Max Profit/Day
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <NativeSelect
              value={timeframe}
              onChange={handleTimeFrame}
              label="Enter Amount: "
            >
              <option value={1}>1 min</option>
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={30}>30 min</option>
            </NativeSelect>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Timeframe</Typography>
        }
        labelPlacement="start"
        className={classes.formLabel}
      />
      <FormControlLabel
        control={
          <StyledButton variant="contained" onClick={onClickSave}>
            Save
          </StyledButton>
        }
        label={<Typography className={classes.fontSeparator}></Typography>}
        style={{ marginBottom: "16px" }}
      ></FormControlLabel>
    </>
  );
}
