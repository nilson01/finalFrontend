import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as email_validator from "email-validator"
import {
  TextField,
  Grid,
  Button,
  withStyles,

} from "@material-ui/core";
import { signUpAPIInfo, LoginAPIMethod } from "../api/generalClient";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const history = useHistory();

  const onChange_name = (e) => {
    setName(e.target.value);
  };

  const onChange_email = (e) => {
    setEmail(e.target.value);
  };

  const onChange_password = (e) => {
    setPass(e.target.value);
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
      alert(err);
    }
  };

  const sendSignUpInfo = (e) => {
    // console.log("Signing up for: ", email);

    try {
      if (!email_validator.validate(email)) {
        throw new Error("Invalid email!")
      }
      signUpAPIInfo({ name: name, email: email, password: pass }, (res) => {
        // console.log(res);
        if (res.data.data.message) {
          alert(res.data.data.message);
        }
        else {
          sendLoginInfo()
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <form>
        <Grid item>
          <TextField label="Name" onChange={onChange_name} />
        </Grid>
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
          onClick={sendSignUpInfo}
        >
          Login
        </StyledButton>
      </form>
    </>
  );
}
