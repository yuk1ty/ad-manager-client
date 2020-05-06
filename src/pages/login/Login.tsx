import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { Button, TextField, Paper } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { useAxios } from "../../context/axios";

interface LoginForm {
  userId: string;
  password: string;
}

export function Login() {
  const history = useHistory();
  const [cookies, setCookie] = useCookies([""]);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const axios = useAxios();

  const doLogin = async () => {
    await axios
      .post("/sessions", {
        userId: userId,
        password: password,
      })
      .then((res) => setCookie("x-adm-session", res.data.session));
    history.push("/");
  };

  return (
    <div className="login-form">
      <Paper elevation={3}>
        <h2>Login</h2>
        <TextField
          label="ユーザー ID"
          fullWidth
          name="name"
          value={userId}
          size="small"
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="パスワード"
          fullWidth
          name="password"
          type="password"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={doLogin}>ログイン</Button>
      </Paper>
    </div>
  );
}
