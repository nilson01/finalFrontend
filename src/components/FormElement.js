import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  Typography,
  TextField,
  Switch,
  Box,
  FormGroup,
  FormControlLabel,
  NativeSelect,
  Radio,
  RadioGroup,
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
export default function FormElement() {
  const classes = styles();
  const [activeBot, setActiveBot] = useState(true);
  const [activeTime, setActiveTime] = useState(["09:00", "12:00"]);
  const [market, setMarket] = useState("Z-CRY/IDX");
  const [maxValue, setMaxValue] = useState("");
  const [time, setTime] = useState("01:00");
  const [accType, setAccType] = useState("demo");
  const handleActiveBot = () => {
    setActiveBot((prev) => !prev);
  };
  const handleActiveTime = (e, index) => {
    var temp = activeTime;
    temp[index] = e.target.value;
    setActiveTime(temp);
    // console.log(activeTime);
  };
  const handleMarket = (e) => {
    setMarket(e.target.value);
  };
  const handleMaxValue = (e) => {
    setMaxValue(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleAccType = (e) => {
    setAccType(e.target.value);
  };
  return (
    <>
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <Switch
              checked={activeBot}
              onChange={handleActiveBot}
              name="activateBot"
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Activate Robot
          </Typography>
        }
        labelPlacement="start"
        className={classes.formLabel}
      />
      <FormGroup row={true}>
        <FormControlLabel
          control={
            <Box display="flex" className={classes.boxContainer}>
              <TextField
                onChange={(e) => {
                  handleActiveTime(e, 0);
                }}
                name="activeTime"
                variant="standard"
                placeholder="From"
                type="time"
                label="From"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={activeTime[0]}
              />
              <TextField
                onChange={(e) => {
                  handleActiveTime(e, 1);
                }}
                name="activeTime"
                variant="standard"
                type="time"
                label="To"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={activeTime[1]}
                style={{ marginLeft: "5%" }}
              />
            </Box>
          }
          className={classes.formLabel}
          label={
            <Typography className={classes.fontSeparator}>
              Active Time
            </Typography>
          }
          labelPlacement="start"
        />
      </FormGroup>
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <NativeSelect value={market} onChange={handleMarket} name="market">
              <option value="Z-CRY/IDX">CRY/IDX</option>
            </NativeSelect>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>Market</Typography>
        }
        className={classes.formLabel}
        labelPlacement="start"
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              value={maxValue}
              onChange={handleMaxValue}
              style={{ width: "25%" }}
              label="Enter Amount"
              InputProps={{
                startAdornment: "$ ",
              }}
            ></TextField>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator} value={maxValue}>
            Maximum Value
          </Typography>
        }
        className={classes.formLabel}
        labelPlacement="start"
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              onChange={handleTime}
              name="activeTime"
              placeholder="From"
              type="time"
              defaultValue={time}
            />
          </Box>
        }
        className={classes.formLabel}
        label={
          <Typography className={classes.fontSeparator}>
            Interval in Minute
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        control={
          <Box display="flex" className={classes.boxContainer}>
            <RadioGroup
              name="accType"
              row={true}
              value={accType}
              onChange={handleAccType}
            >
              <FormControlLabel
                control={<Radio value="demo" />}
                label="Demo"
                value="demo"
              />
              <FormControlLabel
                control={<Radio value="real" />}
                label="Real"
                value="real"
              />
            </RadioGroup>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Account Type
          </Typography>
        }
        labelPlacement="start"
        className={classes.formLabel}
      />
      <FormControlLabel
        control={<StyledButton variant="contained">Save</StyledButton>}
        label={<Typography className={classes.fontSeparator}></Typography>}
        labelPlacement="start"
        style={{ marginBottom: "16px" }}
      ></FormControlLabel>
    </>
  );
}
