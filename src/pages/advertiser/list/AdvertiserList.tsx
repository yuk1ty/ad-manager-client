import React, { useState, useEffect } from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { AdvertiserData } from "../../../context/types";
import { SessionRepository } from "../../../context/session";
import { useAxios } from "../../../context/axios";
import {
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
  Table,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

export function AdvertiserList() {
  const [advertisers, setAdvertisers] = useState<AdvertiserData[]>([]);
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  useEffect(() => {
    const fetchAdvertiserData = async () => {
      const result = await axios(session).get("/advertisers");
      setAdvertisers(result.data);
    };
    fetchAdvertiserData();
  }, [axios, session]);

  return (
    <>
      <Header />
      <StandardLayout title="広告主一覧">
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>広告主名</TableCell>
                <TableCell>ドメイン</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {advertisers.map((advertiser) => (
                <TableRow key={advertiser.id}>
                  <TableCell>{advertiser.id}</TableCell>
                  <TableCell>{advertiser.name}</TableCell>
                  <TableCell>{advertiser.domain}</TableCell>
                  <TableCell>
                    <Button>
                      <Edit />
                    </Button>
                    <Button>
                      <Delete />
                    </Button>
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
