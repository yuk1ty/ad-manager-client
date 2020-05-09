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
  FormControl,
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

export function AdGroupRegister() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [dailyBudget, setDailyBudget] = useState(0);
  const [deliveryStartAt, setDeliveryStartAt] = useState("2020-05-01T00:00");
  const [deliveryEndAt, setDeliveryEndAt] = useState("2020-05-01T00:00");
  const [segmentName, setSegmentName] = useState("");
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

  function readFileAsText(file: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve((reader.result as string) || "");
      reader.readAsText(file);
    });
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const adGroup = {
      name: name,
      campaignId: id,
      monthlyBudget: monthlyBudget,
      dailyBudget: dailyBudget,
      deliveryStartAt: deliveryStartAt,
      deliveryEndAt: deliveryEndAt,
      segments: {
        name: segmentName,
        deviceIds: readFileAsText(acceptedFiles[0]),
      },
    };

    await axios(session)
      .post(`/campaigns/${id}/ad-groups`, adGroup)
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
      <StandardLayout title="広告グループ登録">
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
              label="月予算"
              name="monthlyBudget"
              fullWidth
              size="small"
              onChange={(e) => setMonthlyBudget(+e.target.value)}
            />
            <TextField
              label="日予算"
              name="dailyBudget"
              fullWidth
              size="small"
              onChange={(e) => setDailyBudget(+e.target.value)}
            />
            <TextField
              id="delivery-start-at"
              label="配信開始日時"
              type="datetime-local"
              value={deliveryStartAt}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDeliveryStartAt(e.target.value)}
            />
            <TextField
              id="delivery-start-at"
              label="配信終了日時"
              type="datetime-local"
              value={deliveryEndAt}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDeliveryEndAt(e.target.value)}
            />
            <FormControl fullWidth>
              <TextField
                id="segment-name"
                label="セグメント名"
                fullWidth
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              <div {...getRootProps()} className={classes.fileUploadArea}>
                <input {...getInputProps()} />
                {<p>ファイルをドラッグ & ドロップするかクリックしてください</p>}
              </div>
              <aside>
                <h4>アップロード予定のファイル</h4>
                <ul>{file}</ul>
              </aside>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              広告グループを登録する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
