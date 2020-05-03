import React, { useState, useEffect } from "react";
import { Table, Button } from "element-react";
import { Header } from "../../components/header/Header";
import { StandardLayout } from "../../components/context/StandardLayout";
import axios from "axios";

export function UserList() {
  const [tableColumn] = useState([
    {
      type: "index",
    },
    {
      label: "ユーザー名",
      prop: "user_name",
    },
    {
      label: "メールアドレス",
      prop: "email_address",
    },
    {
      label: "代理店",
      prop: "agency",
    },
    {
      label: "オペレーション",
      render: function () {
        return (
          <span>
            <Button plain={true} type="info" size="small">
              編集
            </Button>
            <Button type="danger" size="small">
              削除
            </Button>
          </span>
        );
      },
    },
  ]);

  const [tableData, setData] = useState();

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios.get("http://localhost:8080/users");
      setData(result.data);
    };
    fetchTableData();
  }, []);

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー一覧">
        <Table
          columns={tableColumn}
          data={tableData}
          border={true}
          highlightCurrentRow={true}
        />
      </StandardLayout>
    </>
  );
}
