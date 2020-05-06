import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CampaignData } from "../../../context/types";
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
} from "@material-ui/core";
import { DeliveryStatusBadge } from "../../../components/badges/DeliveryStatusBadge";

const userStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      padding: theme.spacing(3, 3),
      marginBottom: theme.spacing(6),
    },
    title: {
      padding: theme.spacing(0, 0, 3, 0),
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
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios();
  const classes = userStyles();

  useEffect(() => {
    const fetchCampaignData = async () => {
      const result = await axios.get(`/campaigns/${id}`);
      setCampaign(result.data);
    };
    fetchCampaignData();
  }, [id, axios, session]);

  return (
    <>
      <Header />
      <StandardLayout title="キャンペーン詳細">
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
              請求タイプ
            </Grid>
            <Grid item xs={9}>
              {campaign.billingType}
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
          </Grid>
        </Paper>
      </StandardLayout>
    </>
  );
}
