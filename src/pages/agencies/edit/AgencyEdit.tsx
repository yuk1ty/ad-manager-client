import React, { useState, SyntheticEvent, useEffect } from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { useHistory, useParams } from "react-router-dom";
import { Paper, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";

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

export function AgencyEdit() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchAgencyData = async () => {
      const result = (await axios.get(`http://localhost:8080/agencies/${id}`))
        .data;
      setName(result.name);
    };
    fetchAgencyData();
  }, [id]);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const agency = {
      name: name,
    };
    await axios
      .patch(`http://localhost:8080/agencies/${id}`, agency)
      .then((res) => {
        history.push("/agencies/list");
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="代理店編集">
        <Paper elevation={3} className="agency-register-form">
          <form onSubmit={onSubmit} className={classes.root}>
            <TextField
              label="代理店名"
              name="name"
              fullWidth
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              代理店を更新する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
