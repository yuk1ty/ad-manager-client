import React, { useState, SyntheticEvent, useEffect } from "react";
import "./UserRegister.css";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Button,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AgencyData } from "../../../context/types";
import { useAxios } from "../../../context/axios";
import { SessionRepository } from "../../../context/session";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1, 0, 1, 0),
      },
      "& .MuiSelect-root": {
        margin: theme.spacing(1, 0, 1, 0),
      },
      "& .MuiFormControl-root": {
        margin: theme.spacing(1, 0, 1, 0),
      },
    },
    submitButton: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  })
);

export function UserRegister() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [emailAddress, setAddress] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<unknown>();
  const [agencies, setAgencies] = useState<AgencyData[]>([]);
  const [role, setRole] = useState(2);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const fetchAgencyData = async () => {
      const result = await axios(session).get("/agencies");
      setAgencies(result.data);
    };
    fetchAgencyData();
  }, [axios, session]);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const targetAgency = agencies.find(
      (agency) => agency.id === selectedAgency
    );
    const user = {
      name: name,
      userId: userId,
      emailAddress: emailAddress,
      rawPassword: rawPassword,
      confirmPassword: confirmPassword,
      agency: targetAgency, // TODO どこかで ID に変えておく
      role: role,
    };
    await axios(session)
      .post("/users", user)
      .then((res) => {
        history.push("/users/list");
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー登録">
        <Paper elevation={3} className="user-register-form">
          <form onSubmit={onSubmit} className={classes.root}>
            <TextField
              label="ユーザー名"
              name="name"
              fullWidth
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="メールアドレス"
              value={emailAddress}
              fullWidth
              size="small"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="ログイン用ユーザー ID"
              value={userId}
              fullWidth
              size="small"
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              label="登録用パスワード"
              value={rawPassword}
              fullWidth
              size="small"
              onChange={(e) => setRawPassword(e.target.value)}
            />
            <TextField
              label="確認用パスワード"
              value={confirmPassword}
              fullWidth
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="select-agency">代理店</InputLabel>
              <Select
                labelId="select-agency"
                value={selectedAgency}
                fullWidth
                onChange={(e) => setSelectedAgency(e.target.value as number)}
              >
                {agencies.map((agency) => (
                  <MenuItem value={agency.id}>{agency.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel component="legend">ユーザー権限</FormLabel>
              <RadioGroup
                aria-label="ユーザー権限"
                value={role}
                onChange={(e) => setRole(+(e.target as HTMLInputElement).value)}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="管理者"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="一般ユーザー"
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              ユーザーを新規登録する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
