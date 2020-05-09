import React, { useState, useEffect, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { AgencyData } from "../../../context/types";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import { RegisterStickyButtons } from "../../../components/operations/RegisterStickyButtons";
import { TableSideOperations } from "../../../components/operations/TableSideOperations";
import { ErrorAlert } from "../../../components/error/ErrorAlert";

export function AgencyList() {
  const [agencies, setAgencies] = useState<AgencyData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  useEffect(() => {
    const fetchAgencyData = async () => {
      await axios(session)
        .get("/agencies")
        .then((res) => setAgencies(res.data))
        .catch((err) => {
          const res = err.response;
          setErrors(res.data.errors);
        });
    };
    fetchAgencyData();
  }, [axios, session]);

  function transitToRegisterPage() {
    history.push(`/agencies/register`);
  }

  function transitToEditPage(e: SyntheticEvent, agency: AgencyData) {
    e.preventDefault();
    history.push(`/agencies/${agency.id}/edit`);
  }

  async function removeAgency(e: SyntheticEvent, agency: AgencyData) {
    e.preventDefault();
    await axios(session)
      .delete(`/agencies/${agency.id}`)
      .then((res) => {
        const result = agencies.filter((item) => agency.id !== item.id);
        setAgencies(result);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="代理店一覧">
        <ErrorAlert errors={errors} />
        <RegisterStickyButtons onClick={transitToRegisterPage} />
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>代理店名</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agencies.map((agency) => (
                <TableRow key={agency.id}>
                  <TableCell>{agency.id}</TableCell>
                  <TableCell>{agency.name}</TableCell>
                  <TableCell>
                    <TableSideOperations
                      entity={agency}
                      onEditClick={(e) => transitToEditPage(e, agency)}
                      onDeleteClick={(e) => removeAgency(e, agency)}
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
