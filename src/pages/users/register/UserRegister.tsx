import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

export function UserRegister() {
  const [name, setName] = useState("");
  const [emailAddress, setAddress] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const user = {
      name: name,
      emailAddress: emailAddress,
      rawPassword: rawPassword,
      confirmPassword: confirmPassword,
      agency: {
        id: 1,
        name: "CyberAgent",
      },
    };
    console.log(user);
    await axios.post("http://localhost:8080/users", user);
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー登録">
        <form onSubmit={onSubmit}>
          <TextField
            label="ユーザー名"
            name="name"
            fullWidth
            value={name}
            variant="filled"
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="メールアドレス"
            value={emailAddress}
            fullWidth
            variant="filled"
            size="small"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="登録用パスワード"
            value={rawPassword}
            fullWidth
            variant="filled"
            size="small"
            onChange={(e) => setRawPassword(e.target.value)}
          />
          <TextField
            label="確認用パスワード"
            value={confirmPassword}
            fullWidth
            variant="filled"
            size="small"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">ユーザーを新規登録する</Button>
        </form>
      </StandardLayout>
    </>
  );
}
