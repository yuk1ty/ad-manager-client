import React from "react";
import { Header } from "../../../components/header/Header";
import { StandardLayout } from "../../../components/context/StandardLayout";
import { Form, Input, Button, Radio } from "element-react";

export function UserRegister() {
  return (
    <>
      <Header />
      <StandardLayout title="ユーザー登録">
        <Form className="en-US" labelWidth="120">
          <Form.Item label="ユーザー名">
            <Input />
          </Form.Item>
          <Form.Item label="メールアドレス">
            <Input />
          </Form.Item>
          <Form.Item label="登録用パスワード">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="パスワード確認">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="ユーザー権限">
            <Radio.Group>
              <Radio value="管理者"></Radio>
              <Radio value="メンバー"></Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="所属代理店">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary">ユーザーを新規作成する</Button>
          </Form.Item>
        </Form>
      </StandardLayout>
    </>
  );
}
