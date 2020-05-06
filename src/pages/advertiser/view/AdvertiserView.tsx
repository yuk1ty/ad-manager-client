import React from "react";
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

export function AdvertiserView() {
  const classes = userStyles();

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
              1
            </Grid>
            <Grid item xs={3}>
              名前
            </Grid>
            <Grid item xs={9}>
              広告主 A
            </Grid>
            <Grid item xs={3}>
              ドメイン
            </Grid>
            <Grid item xs={9}>
              google.com
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
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>キャンペーン1</TableCell>
                <TableCell>2020/05/14 00:00:00</TableCell>
                <TableCell>2020/06/01 23:59:59</TableCell>
                <TableCell>
                  <Chip label="配信中" color="primary" />
                </TableCell>
                <TableCell>2020/05/01 15:45:39</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </StandardLayout>
    </>
  );
}
