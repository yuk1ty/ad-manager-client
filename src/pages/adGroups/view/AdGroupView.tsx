import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { AdGroupData, AdTableData } from "../../../context/types";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { DeliverySwitchBadge } from "../../../components/badges/DeliverySwitchBadge";
import { Edit, Delete } from "@material-ui/icons";

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
    absolute: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    opsBtn: {
      right: theme.spacing(2),
    },
  })
);

export function AdGroupView() {
  const { id } = useParams();
  const [adGroup, setAdGroup] = useState<AdGroupData>({
    id: 0,
    name: "",
    monthlyBudget: 0,
    dailyBudget: 0,
    deliveryStartAt: "",
    deliveryEndAt: "",
    segments: [],
    ads: [],
    createdAt: "",
    updatedAt: "",
  });
  const [ads, setAds] = useState<AdTableData[]>([]);

  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchCampaignData = async () => {
      const result = await axios(session).get(`/ad-groups/${id}`);
      setAdGroup(result.data);
      setAds(result.data.ads);
    };
    fetchCampaignData();
  }, [id, axios, session]);

  function creativeCount(ad: AdTableData): number {
    if (ad.creatives !== undefined) {
      return ad.creatives.length;
    } else {
      return 0;
    }
  }

  function transitToEditPage() {
    history.push(`/ad-groups/${id}/edit`);
  }

  async function removeCampaign() {
    await axios(session)
      .delete(`/ad-groups/${id}`)
      .then((res) => history.goBack());
  }

  return (
    <>
      <Header />
      <StandardLayout title="広告グループ詳細">
        <Box className={classes.absolute} component="div">
          <Tooltip title="編集" aria-label="add">
            <Fab
              color="default"
              className={classes.opsBtn}
              onClick={transitToEditPage}
            >
              <Edit />
            </Fab>
          </Tooltip>
          <Tooltip title="削除" aria-label="add">
            <Fab color="secondary" onClick={removeCampaign}>
              <Delete />
            </Fab>
          </Tooltip>
        </Box>
        <Paper elevation={3} className={classes.inner}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              ID
            </Grid>
            <Grid item xs={9}>
              {adGroup.id}
            </Grid>
            <Grid item xs={3}>
              名前
            </Grid>
            <Grid item xs={9}>
              {adGroup.name}
            </Grid>
            <Grid item xs={3}>
              月予算
            </Grid>
            <Grid item xs={9}>
              {adGroup.monthlyBudget} 円
            </Grid>
            <Grid item xs={3}>
              日予算
            </Grid>
            <Grid item xs={9}>
              {adGroup.dailyBudget} 円
            </Grid>
            <Grid item xs={3}>
              配信期間
            </Grid>
            <Grid item xs={9}>
              {adGroup.deliveryStartAt}
              {" 〜 "}
              {adGroup.deliveryEndAt}
              {" まで"}
            </Grid>
            <Grid item xs={3}>
              登録済みセグメント数
            </Grid>
            <Grid item xs={9}>
              {/* もし可能なら、ダイアログで登録したセグメントを表示できるようにしたい */}
            </Grid>
            <Grid item xs={3}>
              作成日時
            </Grid>
            <Grid item xs={9}>
              {adGroup.createdAt}
            </Grid>
            <Grid item xs={3}>
              更新日時
            </Grid>
            <Grid item xs={9}>
              {adGroup.updatedAt}
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" className={classes.title} component="div">
          保有広告
        </Typography>
        <Grid container spacing={0} className={classes.adMenu}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/ad-groups/${id}/ads/register`)}
            >
              広告を追加する
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>広告名</TableCell>
                <TableCell>配信スイッチ</TableCell>
                <TableCell>クリエイティブ件数</TableCell>
                <TableCell>作成日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads !== null &&
                ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>{ad.id}</TableCell>
                    <TableCell>
                      <Link to={`/ads/${ad.id}/view`}>{ad.name}</Link>
                    </TableCell>
                    <TableCell>
                      <DeliverySwitchBadge state={ad.deliverySwitch} />
                    </TableCell>
                    <TableCell>
                      {creativeCount(ad)}
                      {" 件"}
                    </TableCell>
                    <TableCell>{ad.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StandardLayout>
    </>
  );
}
