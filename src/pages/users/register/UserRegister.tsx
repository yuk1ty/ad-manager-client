import React, {
  useState,
  useCallback,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import axios from "axios";

interface UserFormInput {
  name: string;
  emailAddress: string;
  rawPassword: string;
  confirmPassword: string;
}

export function UserRegister() {
  const [user, setUser] = useState<UserFormInput>({
    name: "",
    emailAddress: "",
    rawPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setUser((user) => ({ ...user, [e.target.name]: e.target.value })),
    []
  );

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    await axios.post("http://localhost:8080/users", { user });
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー登録">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            key="name"
            name="name"
            fullWidth
            value={user.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            key="emailAddress"
            name="emailAddress"
            fullWidth
            value={user.emailAddress}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            key="rawPassword"
            name="rawPassword"
            fullWidth
            value={user.rawPassword}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            key="confirmPassword"
            name="confirmPassword"
            fullWidth
            value={user.confirmPassword}
            onChange={handleInputChange}
          />
          <Button type="submit">ユーザーを新規登録する</Button>
        </form>
      </StandardLayout>
    </>
  );
}
