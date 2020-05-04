import React, { useState, useEffect, SyntheticEvent } from "react";
import { Header } from "../../components/header/Header";
import { StandardLayout } from "../../components/context/StandardLayout";
import axios from "axios";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  emailAddress: string;
  agency: { id: number; name: string };
  role: number;
}

export function UserList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    };
    fetchTableData();
  }, []);

  function transitToEditPage(e: SyntheticEvent, user: UserData) {
    e.preventDefault();
    history.push(`/users/${user.id}/edit`);
  }

  async function removeUser(e: SyntheticEvent, user: UserData) {
    e.preventDefault();
    await axios.delete(`http://localhost:8080/users/${user.id}`).then((res) => {
      const result = users.filter((item) => user.id !== item.id);
      setUsers(result);
    });
  }

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー一覧">
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
                    {user.role === 1 ? "管理者" : "メンバー"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="編集">
                      <IconButton
                        onClick={(e) => transitToEditPage(e, user)}
                        aria-label="edit"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="削除">
                      <IconButton
                        onClick={(e) => removeUser(e, user)}
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
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
