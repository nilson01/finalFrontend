import React, { useState, useRef } from "react";
import {
  makeStyles,
  withStyles,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  Button,
  Snackbar,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import {
  uploadImageToCloudinaryAPIMethod,
  changeProfileAPIMethod,
  changePasswordAPIMethod,
  checkPasswordAPIMethod,
} from "../api/profileClient";

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
  inputText: {
    width: "50%",
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
export default function ProfileElement(props) {
  const classes = styles();
  const [picture, setPicture] = useState(localStorage.getItem("profile_url"));
  const [success, setSuccess] = useState("success");
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  var pictureRef = useRef(null);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSnackbarClose = (e) => {
    setOpen(false);
  };


  // Password change handler

  const onClickSave = async (e) => {
    try {
      const currPassword = await checkPasswordAPIMethod({
        password: oldPassword,
      });
      if (!currPassword.data.success) {
        setSuccess("warning");
        setOpen(true);
        setSnackBarMessage("Wrong old password");
        return;
      }
      if (confirmPassword !== newPassword) {
        setSuccess("warning");
        setOpen(true);
        setSnackBarMessage("Confirm your password");
        return;
      }
      if (newPassword)
        changePasswordAPIMethod({
          password: newPassword,
        });
      setSuccess("success");
      setOpen(true);
      setSnackBarMessage("Profile Updated");
    }
    catch (err) {
      setSuccess("error");
      setOpen(true);
      setSnackBarMessage("Fail to Update");
    }

  };
  // Profile picture change handler
  const handlePhotoChange = async(e) => {
    try {
      const selectedFile = e.target.files[0];
      const t = selectedFile.type.split("/").pop().toLowerCase();
      if (
        t !== "jpg" &&
        t !== "jpeg" &&
        t !== "png" &&
        t !== "bmp" &&
        t !== "gif"
      ) {
        alert("Enter valid file");
        return;
      }
      const formData = new FormData();
      formData.append("upload_preset", "ckgxxhz4");
      formData.append("file", selectedFile);
      await uploadImageToCloudinaryAPIMethod(formData, (res) => {
        setPicture(res.url);
        props.setProfilePicture(res.url);
        // console.log(res.url);
        localStorage.setItem("profile_url", res.url);

      });
      await changeProfileAPIMethod({
        profile_url: picture,
      });
      setSuccess("success");
      setOpen(true);
      setSnackBarMessage("Profile picture Updated");
    }
    catch (err) {
      setSuccess("error");
      setOpen(true);
      setSnackBarMessage("Fail to Update");
    }
  };


  return (
    <>
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <img
              src={picture}
              style={{
                height: "75px",
                width: "75px",
                marginRight: "24px",
                borderRadius: "50%",
              }}
              alt="user profile"
            ></img>
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
              ref={(input) => {
                pictureRef = input;
              }}
            ></input>
            <StyledButton
              onClick={() => {
                pictureRef.click();
              }}
            >
              Upload photo
            </StyledButton>
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Change Picture
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              className={classes.inputText}
              value={email}
              onChange={handleEmail}
              label="Enter your Email: "
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Email Address
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              className={classes.inputText}
              value={oldPassword}
              onChange={handleOldPassword}
              label="Enter Old Password: "
              type="password"
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Old Password
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              className={classes.inputText}
              value={newPassword}
              onChange={handleNewPassword}
              label="Enter New Password: "
              type="password"
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            New Password
          </Typography>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        className={classes.formLabel}
        control={
          <Box display="flex" className={classes.boxContainer}>
            <TextField
              className={classes.inputText}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              label="Confirm password "
              type="password"
            />
          </Box>
        }
        label={
          <Typography className={classes.fontSeparator}>
            Confirm Password
          </Typography>
        }
        labelPlacement="start"
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={`${success}`}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
