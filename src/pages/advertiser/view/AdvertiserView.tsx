import React, { useState, useEffect } from "react";
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
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@material-ui/core";
import { SessionRepository } from "../../../context/session";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../../../context/axios";
import { AdvertiserData } from "../../../context/types";
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

interface CampaignTableData {
  id: number;
  name: string;
  deliveryStartAt: string;
  deliveryEndAt: string;
  deliveryStatus: number;
  createdAt: string;
}

export function AdvertiserView() {
  const { id } = useParams();
  const [advertiser, setAdvertiser] = useState<AdvertiserData>({
    id: 0,
    name: "",
    domain: "",
  });
  const [campaigns, setCampaigns] = useState<CampaignTableData[]>([]);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const classes = userStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(session).get(`/advertisers/${id}`);
      setAdvertiser(result.data);
    };
    fetchData();
  }, [id, axios, session]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(session).get(`/advertisers/${id}/campaigns`);
      setCampaigns(result.data);
    };
    fetchData();
  }, [id, axios, session]);

  return (
    <>
      <Header />
      <StandardLayout title="広告主">
        <Paper elevation={3} className={classes.inner}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              ID
            </Grid>
            <Grid item xs={9}>
              {advertiser.id}
            </Grid>
            <Grid item xs={3}>
              名前
            </Grid>
            <Grid item xs={9}>
              {advertiser.name}
            </Grid>
            <Grid item xs={3}>
              ドメイン
            </Grid>
            <Grid item xs={9}>
              {advertiser.domain}
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" className={classes.title} component="div">
          保有キャンペーン
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>キャンペーン名</TableCell>
                <TableCell>配信開始日</TableCell>
                <TableCell>配信終了日</TableCell>
                <TableCell>配信ステータス</TableCell>
                <TableCell>作成日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>{campaign.id}</TableCell>
                  <TableCell>
                    <Link to={`/campaigns/${campaign.id}`}>
                      {campaign.name}
                    </Link>
                  </TableCell>
                  <TableCell>{campaign.deliveryStartAt}</TableCell>
                  <TableCell>{campaign.deliveryEndAt}</TableCell>
                  <TableCell>
                    <DeliveryStatusBadge status={campaign.deliveryStatus} />
                  </TableCell>
                  <TableCell>{campaign.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StandardLayout>
    </>
  );
}
