import React, { SyntheticEvent, useState } from "react";
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
import { useParams, useHistory } from "react-router-dom";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { ErrorAlert } from "../../../components/error/ErrorAlert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      "& .MuiTextField-root": {
        margin: theme.spacing(0, 0, 1, 0),
      },
      "& .MuiSelect-root": {
        margin: theme.spacing(1, 0, 1, 0),
      },
      "& .MuiFormControl-root": {
        margin: theme.spacing(1, 0, 1, 0),
      },
    },
    hiddenFile: {
      display: "none",
    },
    submitButton: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  })
);

export function AdRegister() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const classes = useStyles();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const history = useHistory();

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const ad = {
      name: name,
      adGroupId: +id,
      landingPageUrl: landingPageUrl,
    };

    await axios(session)
      .post("/ads", ad)
      .then((res) => {
        history.push(`/ads/${res.data.id}/view`);
      })
      .catch((err) => {
        const res = err.response;
        setErrors(res.data.errors);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="広告登録">
        <ErrorAlert errors={errors} />
        <Paper elevation={3} className={classes.root}>
          <form onSubmit={onSubmit} className={classes.root}>
            <TextField
              label="広告グループ名"
              name="name"
              fullWidth
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="ランディングページ"
              name="landingPageUrl"
              fullWidth
              size="small"
              onChange={(e) => setLandingPageUrl(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              広告を登録する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
