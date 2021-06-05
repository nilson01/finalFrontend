import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  Button,
  withStyles,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LoginAPIMethod } from "../api/generalClient";
import { getprofileurlAPIMethod, changeProfileAPIMethod } from "../api/profileClient";

const StyledButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "30%",
    alignSelf: "center",
    zIndex: theme.zIndex.drawer + 2,
  },
  label: {
    textTransform: "capitalize",
  },
}))(Button);

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const onChange_email = (e) => {
    setEmail(e.target.value);
  };

  const onChange_password = (e) => {
    setPass(e.target.value);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const sendLoginInfo = async (e) => {
    try {
      await LoginAPIMethod({ email: email, password: pass }, async (res) => {
        localStorage.setItem("balance", res.data.data.balance);
        props.setPass(pass);
        await getprofileurlAPIMethod((res) => {
          // console.log(res.data.data);
          localStorage.setItem("accountType", res.data.data.accountType);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("profile_url", res.data.data.profile_url);
          localStorage.setItem(
            "setting",
            JSON.stringify(res.data.data.setting)
          );
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          localStorage.setItem("email", res.data.data.email);
          history.push(`/dashboard`);
        });
      });

      await changeProfileAPIMethod({
        balance: localStorage.getItem("balance"),
      });

    } catch (err) {
      // console.log(err);
      setOpen(true);
    }
  };


  return (
    <>
      <form>
        <Grid item>
          <TextField label="Email" value={email} onChange={onChange_email} />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            value={pass}
            type="password"
            onChange={onChange_password}
          />
        </Grid>
        <StyledButton
          variant="contained"
          style={{ margin: "16px" }}
          onClick={sendLoginInfo}
        >
          Login
        </StyledButton>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          Wrong Pasword or Email
        </Alert>
      </Snackbar>
    </>
  );
}
