import React, { useState, SyntheticEvent, useEffect } from "react";
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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { useHistory, useParams } from "react-router-dom";
import { AdvertiserData } from "../../../context/types";
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
    submitButton: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  })
);

export function CampaignEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(0);
  const [dailyBudgetUpperLimit, setDailyBudgetUpperLimit] = useState(0);
  const [charge, setCharge] = useState(0); // TODO なんか動いてないっぽいのであとで調査
  const [deliveryStartAt, setDeliveryStartAt] = useState("");
  const [deliveryEndAt, setDeliveryEndAt] = useState("");
  const [advertisers, setAdvertisers] = useState<AdvertiserData[]>([]);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const fetchCampaign = async () => {
      await axios(session)
        .get(`/campaigns/${id}`)
        .then((res) => {
          setName(res.data.name);
          setMonthlyBudgetLimit(res.data.monthlyBudgetLimit);
          setDailyBudgetUpperLimit(res.data.dailyBudgetUpperLimit);
          setCharge(res.data.charge);
          setDeliveryStartAt(res.data.deliveryStartAt);
          setDeliveryEndAt(res.data.deliveryEndAt);
          setSelectedAdvertiser(res.data.advertiserId);
        });
    };

    const fetchAdvertiserData = async () => {
      const result = await axios(session).get("/advertisers");
      setAdvertisers(result.data);
    };
    fetchCampaign();
    fetchAdvertiserData();
  }, [id, axios, session]);

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const campaign = {
      name: name,
      deliveryStatus: 1, // 一旦作成時は 1 で送る。
      monthlyBudgetLimit: monthlyBudgetLimit,
      dailyBudgetUpperLimit: dailyBudgetUpperLimit,
      chage: charge,
      deliveryStartAt: deliveryStartAt,
      deliveryEndAt: deliveryEndAt,
      advertiserId: selectedAdvertiser,
    };

    await axios(session)
      .patch(`/campaigns/${id}`, campaign)
      .then((res) => {
        const campaign = res.data;
        history.push(`/campaigns/${campaign.id}/view`);
      })
      .catch((err) => {
        const res = err.response;
        setErrors(res.data.errors);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="キャンペーン編集">
        <ErrorAlert errors={errors} />
        <Paper elevation={3} className={classes.root}>
          <form onSubmit={onSubmit} className={classes.root}>
            <TextField
              label="キャンペーン名"
              name="name"
              value={name}
              fullWidth
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="月予算"
              name="monthlyBudgetLimit"
              value={monthlyBudgetLimit}
              fullWidth
              size="small"
              onChange={(e) => setMonthlyBudgetLimit(+e.target.value)}
            />
            <TextField
              label="日予算上限"
              name="dailyBudgetUpperLimit"
              value={dailyBudgetUpperLimit}
              fullWidth
              size="small"
              onChange={(e) => setDailyBudgetUpperLimit(+e.target.value)}
            />
            <TextField
              label="請求金額"
              name="charge"
              value={charge}
              fullWidth
              size="small"
              onChange={(e) => setCharge(+e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="select-advertiser">広告主</InputLabel>
              <Select
                labelId="select-advertiser"
                value={selectedAdvertiser}
                onChange={(e) =>
                  setSelectedAdvertiser(e.target.value as number)
                }
              >
                {advertisers.map((advertiser) => (
                  <MenuItem value={advertiser.id}>{advertiser.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              キャンペーンを編集する
            </Button>
          </form>
        </Paper>
      </StandardLayout>
    </>
  );
}
