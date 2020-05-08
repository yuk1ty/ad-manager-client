import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AdData, Creative } from "../../../context/types";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { DeliverySwitchBadge } from "../../../components/badges/DeliverySwitchBadge";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      padding: theme.spacing(3, 3),
      marginBottom: theme.spacing(6),
    },
    title: {
      padding: theme.spacing(0, 0, 3, 0),
    },
    adMenu: {
      textAlign: "right",
      margin: theme.spacing(0, 0, 2, 0),
    },
  })
);

export function AdView() {
  const { id } = useParams();
  const [ad, setAd] = useState<AdData>({
    id: 0,
    name: "",
    landingPageUrl: "",
    deliverySwitch: 0,
    creative: null,
    createdAt: "",
    updatedAt: "",
  });
  const [creative, setCreative] = useState<Creative | null>(null);

  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchAds = async () => {
      const result = await axios(session).get(`/ads/${id}`);
      setAd(result.data);
      console.log(result.data);
      setCreative(result.data.creative);
    };
    fetchAds();
    // fetchAds();
  }, [id, axios, session]);

  return (
    <>
      <Header />
      <StandardLayout title="広告グループ詳細">
        <Paper elevation={3} className={classes.inner}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              ID
            </Grid>
            <Grid item xs={9}>
              {ad.id}
            </Grid>
            <Grid item xs={3}>
              名前
            </Grid>
            <Grid item xs={9}>
              {ad.name}
            </Grid>
            <Grid item xs={3}>
              ランディングページ
            </Grid>
            <Grid item xs={9}>
              {ad.landingPageUrl}
            </Grid>
            <Grid item xs={3}>
              配信スイッチ
            </Grid>
            <Grid item xs={9}>
              <DeliverySwitchBadge state={ad.deliverySwitch} />
            </Grid>
            <Grid item xs={3}>
              作成日時
            </Grid>
            <Grid item xs={9}>
              {ad.createdAt}
            </Grid>
            <Grid item xs={3}>
              更新日時
            </Grid>
            <Grid item xs={9}>
              {ad.updatedAt}
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" className={classes.title} component="div">
          保有クリエイティブ
        </Typography>

        {creative == null ? (
          <Grid container spacing={0} className={classes.adMenu}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/ads/${id}/creative/register`)}
              >
                クリエイティブを追加する
              </Button>
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
        <Paper elevation={3} className={classes.inner}>
          {creative === null ? (
            <Alert severity="warning">クリエイティブが登録されていません</Alert>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={3}>
                ID
              </Grid>
              <Grid item xs={9}>
                {creative?.id}
              </Grid>
              <Grid item xs={3}>
                ファイル名
              </Grid>
              <Grid item xs={9}>
                {creative?.name}
              </Grid>
              <Grid item xs={12}>
                画像
              </Grid>
              <Grid item xs={12}>
                {creative?.url}
              </Grid>
            </Grid>
          )}
        </Paper>
      </StandardLayout>
    </>
  );
}
