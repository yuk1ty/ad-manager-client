import React, { useState, SyntheticEvent } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
} from "@material-ui/core";
import { useCookies } from "react-cookie";
import { useAxios } from "../../context/axios";
import { LockOutlined } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { ErrorResp } from "../../context/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [cookies, setCookie] = useCookies([""]);
  const [errors, setErrors] = useState<string[]>([]);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const axios = useAxios();

  const doLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("/sessions", {
        userId: userId,
        password: password,
      })
      .then((res) => {
        setCookie("x-adm-session", res.data.session);
        history.push("/");
      })
      .catch((err: ErrorResp) => {
        setErrors(err.response?.data.errors || [err.message]);
      });
  };

  return (
    <div className="login-form">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ad Manager ログイン
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => doLogin(e)}>
          {errors.length !== 0 &&
            errors.map((err) => (
              <Alert key={err} severity="error">
                {err}
              </Alert>
            ))}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user_id"
            label="ユーザー ID"
            name="user_id"
            autoComplete="ユーザー ID"
            value={userId}
            autoFocus
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            ログイン
          </Button>
        </form>
      </div>
    </div>
  );
}
