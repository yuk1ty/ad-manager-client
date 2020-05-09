import React, { useState, useEffect, SyntheticEvent } from "react";
import { Header } from "../../components/header/Header";
import { StandardLayout } from "../../components/context/StandardLayout";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserData } from "../../context/types";
import { useAxios } from "../../context/axios";
import { SessionRepository } from "../../context/session";
import { AuthorityBadge } from "../../components/badges/AuthorityBadge";
import { RegisterStickyButtons } from "../../components/operations/RegisterStickyButtons";
import { TableSideOperations } from "../../components/operations/TableSideOperations";
import { ErrorAlert } from "../../components/error/ErrorAlert";

export function UserList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const repository = SessionRepository();
  const session = repository.session();
  const axios = useAxios;

  useEffect(() => {
    const fetchTableData = async () => {
      await axios(session)
        .get("/users")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          const res = err.response;
          setErrors(res.data.errors);
        });
    };
    fetchTableData();
  }, [axios, session]); // TODO

  function transitToRegisterPage() {
    history.push(`/users/register`);
  }

  function transitToEditPage(e: SyntheticEvent, user: UserData) {
    e.preventDefault();
    history.push(`/users/${user.id}/edit`);
  }

  async function removeUser(e: SyntheticEvent, user: UserData) {
    e.preventDefault();
    await axios(session)
      .delete(`/users/${user.id}`)
      .then((res) => {
        const result = users.filter((item) => user.id !== item.id);
        setUsers(result);
      });
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー一覧">
        <ErrorAlert errors={errors} />
        <RegisterStickyButtons onClick={transitToRegisterPage} />
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>メールアドレス</TableCell>
                <TableCell>代理店</TableCell>
                <TableCell>権限</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.emailAddress}</TableCell>
                  <TableCell>{user.agency.name}</TableCell>
                  <TableCell>
                    <AuthorityBadge authority={user.role} />
                  </TableCell>
                  <TableCell>
                    <TableSideOperations
                      entity={user}
                      onEditClick={(e) => transitToEditPage(e, user)}
                      onDeleteClick={(e) => removeUser(e, user)}
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
