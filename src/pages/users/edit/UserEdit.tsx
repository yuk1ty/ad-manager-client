import React, { useState, useEffect, SyntheticEvent } from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { useParams } from "react-router-dom";
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
import { ErrorAlert } from "../../../components/error/ErrorAlert";

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

export function UserEdit() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  const [name, setName] = useState("");
  const [emailAddress, setAddress] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<unknown>();
  const [agencies, setAgencies] = useState<AgencyData[]>([]);
  const [role, setRole] = useState(2);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      await axios(session)
        .get(`/users/${id}`)
        .then((res) => {
          const result = res.data;
          setName(result.name);
          setAddress(result.emailAddress);
          setSelectedAgency(result.agency.id); // TODO
          setRole(result.role);
        })
        .catch((err) => {
          const res = err.response;
          setErrors(res.data.errors);
        });
    };
    fetchUserData();

    const fetchAgencyData = async () => {
      await axios(session)
        .get("/agencies")
        .then((res) => {
          setAgencies(res.data);
        })
        .catch((err) => {
          const res = err.response;
          setErrors(res.data.errors);
        });
    };
    fetchAgencyData();
  }, [id, axios, session]);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const targetAgency = agencies.find(
      (agency) => agency.id === selectedAgency
    );
    const user = {
      name: name,
      emailAddress: emailAddress,
      agency: targetAgency, // TODO どこかで ID に変えておく
      role: role,
    };
    await axios(session)
      .patch(`/users/${id}`, user)
      .then((res) => {
        history.push("/users/list");
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー編集">
        <ErrorAlert errors={errors} />
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
              ユーザーを更新する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
