import React, { useState } from "react";
import { Table, Button } from "element-react";
import { Header } from "../../components/header/Header";
import { StandardLayout } from "../../components/context/StandardLayout";

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

  const [tableData] = useState([
    {
      user_name: "AAA",
      email_address: "aaa@aaa.com",
      agency: "CyberAgent",
    },
    {
      user_name: "BBB",
      email_address: "bbb@bbb.com",
      agency: "電通",
    },
    {
      user_name: "CCC",
      email_address: "ccc@ccc.com",
      agency: "博報堂",
    },
  ]);

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
