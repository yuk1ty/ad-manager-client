import React, { SyntheticEvent, useState, useCallback } from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { useDropzone } from "react-dropzone";
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
    fileUploadArea: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      border: "1px dotted #ccc",
      textAlign: "center",
    },
  })
);

export function CreativeRegister() {
  const { id } = useParams();
  const [errors, setErrors] = useState<string[]>([]);

  const classes = useStyles();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const history = useHistory();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const file = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const params = new FormData();
    params.append("imageFile", acceptedFiles[0]);

    await axios(session)
      .post(`/ads/${id}/creative`, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        history.goBack();
      })
      .catch((err) => {
        const res = err.response;
        setErrors(res.data.errors);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="クリエイティブ登録">
        <ErrorAlert errors={errors} />
        <Paper elevation={3} className={classes.root}>
          <form onSubmit={onSubmit} className={classes.root}>
            <div {...getRootProps()} className={classes.fileUploadArea}>
              <input {...getInputProps()} />
              {<p>ファイルをドラッグ & ドロップするかクリックしてください</p>}
            </div>
            <aside>
              <h4>アップロード予定のファイル</h4>
              <ul>{file}</ul>
            </aside>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              クリエイティブを登録する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
