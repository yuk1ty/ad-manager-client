import React from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { useParams } from "react-router-dom";

export function UserEdit() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <StandardLayout title="ユーザー編集">
        <div>ユーザーID: {id}</div>
      </StandardLayout>
    </>
  );
}
