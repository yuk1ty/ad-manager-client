import React, { useState, useEffect, SyntheticEvent } from "react";
import { CampaignData } from "../../../context/types";
import { useHistory, Link } from "react-router-dom";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { RegisterStickyButtons } from "../../../components/operations/RegisterStickyButtons";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { DeliveryStatusBadge } from "../../../components/badges/DeliveryStatusBadge";
import { TableSideOperations } from "../../../components/operations/TableSideOperations";
import { ErrorAlert } from "../../../components/error/ErrorAlert";

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios(session).get("/campaigns");
      setCampaigns(result.data);
    };
    fetchTableData();
  }, [axios, session]);

  function transitToRegisterPage() {
    history.push("/campaigns/register");
  }

  function transitToEditPage(e: SyntheticEvent, campaign: CampaignData) {
    e.preventDefault();
    history.push(`/campaigns/${campaign.id}/edit`);
  }

  async function removeCampaign(e: SyntheticEvent, campaign: CampaignData) {
    e.preventDefault();
    await axios(session)
      .delete(`/campaigns/${campaign.id}`)
      .then((res) => {
        const result = campaigns.filter((item) => campaign.id !== item.id);
        setCampaigns(result);
      })
      .catch((err) => {
        const res = err.response;
        setErrors(res.data.errors);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="キャンペーン一覧">
        <ErrorAlert errors={errors} />
        <RegisterStickyButtons onClick={transitToRegisterPage} />
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>キャンペーン名</TableCell>
                <TableCell>配信期間</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>作成日時</TableCell>
                <TableCell></TableCell>
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
                  <TableCell>
                    {campaign.deliveryStartAt}
                    {" 〜 "}
                    {campaign.deliveryEndAt}
                  </TableCell>
                  <TableCell>
                    <DeliveryStatusBadge status={campaign.deliveryStatus} />
                  </TableCell>
                  <TableCell>{campaign.createdAt}</TableCell>
                  <TableCell>
                    <TableSideOperations
                      entity={campaign}
                      onEditClick={(e) => transitToEditPage(e, campaign)}
                      onDeleteClick={(e) => removeCampaign(e, campaign)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StandardLayout>
    </>
  );
}
