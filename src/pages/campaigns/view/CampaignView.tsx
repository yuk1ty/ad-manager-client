import React, { useState, useEffect, SyntheticEvent } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { CampaignData, AdGroupData } from "../../../context/types";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
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
  Tooltip,
  Fab,
  Box,
} from "@material-ui/core";
import { DeliveryStatusBadge } from "../../../components/badges/DeliveryStatusBadge";
import { Edit, Delete } from "@material-ui/icons";

const userStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      padding: theme.spacing(3, 3),
      marginBottom: theme.spacing(6),
    },
    title: {
      padding: theme.spacing(0, 0, 0, 0),
    },
    menu: {
      textAlign: "right",
      margin: theme.spacing(3, 0),
    },
    adgMenu: {
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

export function CampaignView() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<CampaignData>({
    id: 0,
    name: "",
    deliveryStatus: 0,
    billingType: 0,
    monthlyBudgetLimit: 0,
    dailyBudgetUpperLimit: 0,
    charge: 0,
    deliveryStartAt: "",
    deliveryEndAt: "",
    adGroups: [],
    createdAt: "",
    updatedAt: "",
  });
  const [adGroups, setAdGroups] = useState<AdGroupData[]>([]);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const classes = userStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchCampaignData = async () => {
      const result = await axios(session).get(`/campaigns/${id}`);
      setCampaign(result.data);
      setAdGroups(result.data.adGroups);
    };
    fetchCampaignData();
  }, [id, axios, session]);

  async function changeDeliveryStatus(
    e: SyntheticEvent,
    deliveryStatus: number
  ) {
    e.preventDefault();
    await axios(session)
      .patch(`/campaigns/${id}/delivery-status`, {
        deliveryStatus: deliveryStatus,
      })
      .then((res) => {
        setCampaign(res.data);
      });
  }

  function isNotHalted(): boolean {
    return (
      campaign.deliveryStatus !== 1 &&
      campaign.deliveryStatus !== 2 &&
      campaign.deliveryStatus !== 4 &&
      campaign.deliveryStatus !== 5
    );
  }

  function isResumed(): boolean {
    return campaign.deliveryStatus === 4;
  }

  function isNotStarted(): boolean {
    return campaign.deliveryStatus === 2;
  }

  function transitToEditPage() {
    history.push(`/campaigns/${id}/edit`);
  }

  async function removeCampaign() {
    await axios(session)
      .delete(`/campaigns/${id}`)
      .then((res) => history.push("/campaigns/list"));
  }

  return (
    <>
      <Header />
      <StandardLayout title="キャンペーン詳細">
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
        {isNotHalted() && (
          <Grid container spacing={0} className={classes.menu}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => changeDeliveryStatus(e, 4)}
              >
                配信一時停止
              </Button>
            </Grid>
          </Grid>
        )}
        {isResumed() && (
          <Grid container spacing={0} className={classes.menu}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} alignItems="flex-end">
              <Button
                variant="contained"
                color="default"
                onClick={(e) => changeDeliveryStatus(e, 3)}
              >
                配信再開
              </Button>
            </Grid>
          </Grid>
        )}
        {isNotStarted() && (
          <Grid container spacing={0} className={classes.menu}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} alignItems="flex-end">
              <Button
                variant="contained"
                color="default"
                onClick={(e) => changeDeliveryStatus(e, 3)}
              >
                配信開始
              </Button>
            </Grid>
          </Grid>
        )}
        <Paper elevation={3} className={classes.inner}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              ID
            </Grid>
            <Grid item xs={9}>
              {campaign.id}
            </Grid>
            <Grid item xs={3}>
              名前
            </Grid>
            <Grid item xs={9}>
              {campaign.name}
            </Grid>
            <Grid item xs={3}>
              配信ステータス
            </Grid>
            <Grid item xs={9}>
              <DeliveryStatusBadge status={campaign.deliveryStatus} />
            </Grid>
            <Grid item xs={3}>
              月予算
            </Grid>
            <Grid item xs={9}>
              {campaign.monthlyBudgetLimit} 円
            </Grid>
            <Grid item xs={3}>
              日予算設定可能上限
            </Grid>
            <Grid item xs={9}>
              {campaign.dailyBudgetUpperLimit} 円
            </Grid>
            <Grid item xs={3}>
              請求金額
            </Grid>
            <Grid item xs={9}>
              {campaign.charge} 円
            </Grid>
            <Grid item xs={3}>
              配信期間
            </Grid>
            <Grid item xs={9}>
              {campaign.deliveryStartAt}
              {" 〜 "}
              {campaign.deliveryEndAt}
              {" まで"}
            </Grid>
            <Grid item xs={3}>
              作成日時
            </Grid>
            <Grid item xs={9}>
              {campaign.createdAt}
            </Grid>
            <Grid item xs={3}>
              更新日時
            </Grid>
            <Grid item xs={9}>
              {campaign.updatedAt}
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" className={classes.title} component="div">
          保有広告グループ
        </Typography>
        <Grid container spacing={0} className={classes.adgMenu}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                history.push(`/campaigns/${id}/ad-groups/register`)
              }
            >
              広告グループを追加する
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>広告グループ名</TableCell>
                <TableCell>配信期間</TableCell>
                <TableCell>作成日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adGroups !== null &&
                adGroups.map((adGroup) => (
                  <TableRow key={adGroup.id}>
                    <TableCell>{adGroup.id}</TableCell>
                    <TableCell>
                      <Link to={`/ad-groups/${adGroup.id}/view`}>
                        {adGroup.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {adGroup.deliveryStartAt}
                      {" 〜 "}
                      {adGroup.deliveryEndAt}
                    </TableCell>
                    <TableCell>{adGroup.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StandardLayout>
    </>
  );
}
