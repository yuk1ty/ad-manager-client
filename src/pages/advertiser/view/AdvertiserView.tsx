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
  Box,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { SessionRepository } from "../../../context/session";
import { useParams, Link, useHistory } from "react-router-dom";
import { useAxios } from "../../../context/axios";
import { AdvertiserData } from "../../../context/types";
import { DeliveryStatusBadge } from "../../../components/badges/DeliveryStatusBadge";
import { Edit, Delete } from "@material-ui/icons";
import { ErrorAlert } from "../../../components/error/ErrorAlert";

const userStyles = makeStyles((theme: Theme) =>
  createStyles({
    inner: {
      padding: theme.spacing(3, 3),
      marginBottom: theme.spacing(6),
    },
    title: {
      padding: theme.spacing(0, 0, 3, 0),
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
    agency: { id: 0, name: "" },
    createdAt: "",
    updatedAt: "",
  });
  const [campaigns, setCampaigns] = useState<CampaignTableData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;
  const classes = userStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await axios(session)
        .get(`/advertisers/${id}`)
        .then((res) => {
          setAdvertiser(res.data);
          setCampaigns(res.data.campaigns);
        })
        .catch((err) => {
          const res = err.response;
          setErrors(res.errors);
        });
    };
    fetchData();
  }, [id, axios, session]);

  function transitToEditPage() {
    history.push(`/advertisers/${id}/edit`);
  }

  async function removeAdvertiser() {
    await axios(session)
      .delete(`/advertisers/${id}`)
      .then((res) => history.push(`/advertisers/${id}/view`));
  }

  return (
    <>
      <Header />
      <StandardLayout title="広告主">
        <ErrorAlert errors={errors} />
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
            <Fab color="secondary" onClick={removeAdvertiser}>
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
            <Grid item xs={3}>
              代理店名
            </Grid>
            <Grid item xs={9}>
              {advertiser.agency.name}
            </Grid>
            <Grid item xs={3}>
              作成日時
            </Grid>
            <Grid item xs={9}>
              {advertiser.createdAt}
            </Grid>
            <Grid item xs={3}>
              更新日時
            </Grid>
            <Grid item xs={9}>
              {advertiser.updatedAt}
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
                    <Link to={`/campaigns/${campaign.id}/view`}>
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
