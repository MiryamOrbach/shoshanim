import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from '../assets/ShoshanimSLCLogo.png';
import axios from "axios";
import { useHistory } from "react-router-dom";
import BaseRequest from '../helpers/BaseRequest';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height: 50, width: 50, float: "right", cursor: 'pointer'
  }
}));

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    const formData = new FormData();
    formData.append("user", userName);
    formData.append("password", password);
    BaseRequest("LoginProc", formData)
      .then((res: any) => {
        console.log(res);
        localStorage.setItem("userName", res.name);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.related_id);
        localStorage.setItem("role", res.role);
        if (res.role == 1)
          history.push("/home");
        else history.push("/teacherHome")
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          className={classes.img}
          src={Logo}
        />
        <Typography component="h1" variant="h5">
          כניסה
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="שם משתמש"
            name="userName"
            autoComplete="userName"
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            כניסה
          </Button>
        </form>
      </div>
    </Container>
  );
}
