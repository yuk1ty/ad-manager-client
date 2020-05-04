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
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

interface UserData {
  id: number;
  name: string;
  emailAddress: string;
  agency: { id: number; name: string };
}

export function UserList() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    };
    fetchTableData();
  }, []);

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
                    <Button>
                      <Edit />
                    </Button>
                    <Button onClick={(e) => removeUser(e, user)}>
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
