import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
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
      .then((res) => setCookie("x-adm-session", "abcde")); // TODO 便宜的にこうしているが、最終的にはサーバーサイドで Cookie をセットしてくれる
    history.push("/");
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <TextField
        label="ユーザー ID"
        name="name"
        value={userId}
        size="small"
        onChange={(e) => setUserId(e.target.value)}
      />
      <TextField
        label="パスワード"
        name="password"
        type="password"
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={doLogin}>ログイン</Button>
    </div>
  );
}
