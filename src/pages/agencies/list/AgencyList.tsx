import React, { useState, useEffect, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Theme,
  createStyles,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { Edit, Delete, Add } from "@material-ui/icons";

interface AgencyTableData {
  id: number;
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    absolute: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  })
);

export function AgencyList() {
  const [agencies, setAgencies] = useState<AgencyTableData[]>([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchAgencyData = async () => {
      const result = await axios.get("http://localhost:8080/agencies");
      setAgencies(result.data);
    };
    fetchAgencyData();
  }, []);

  function transitToRegisterPage() {
    history.push(`/agencies/register`);
  }

  function transitToEditPage(e: SyntheticEvent, agency: AgencyTableData) {
    e.preventDefault();
    history.push(`/agencies/${agency.id}/edit`);
  }

  async function removeAgency(e: SyntheticEvent, agency: AgencyTableData) {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8080/agencies/${agency.id}`)
      .then((res) => {
        const result = agencies.filter((item) => agency.id !== item.id);
        setAgencies(result);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="代理店一覧">
        <Tooltip title="Add" aria-label="add">
          <Fab
            color="primary"
            className={classes.absolute}
            onClick={() => transitToRegisterPage()}
          >
            <Add />
          </Fab>
        </Tooltip>
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
                    <Button>
                      <Edit onClick={(e) => transitToEditPage(e, agency)} />
                    </Button>
                    <Button>
                      <Delete onClick={(e) => removeAgency(e, agency)} />
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
