import React, { useState, SyntheticEvent } from "react";
import "./AdvertiserRegister.css";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Paper,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

export function AdvertiserRegister() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  const classes = useStyles();
  const history = useHistory();

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const advertiser = {
      name: name,
      domain: domain,
    };
    await axios(session)
      .post("/advertisers", advertiser)
      .then((res) => history.push(`/advertisers/${res.data.id}/view`));
  }

  return (
    <>
      <Header />
      <StandardLayout title="広告主登録">
        <Paper elevation={3} className="advertiser-register-form">
          <form onSubmit={onSubmit} className={classes.root}>
            <TextField
              label="広告主名"
              name="name"
              fullWidth
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="ドメイン"
              name="domain"
              fullWidth
              value={domain}
              size="small"
              onChange={(e) => setDomain(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              広告主を新規登録する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
